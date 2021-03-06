'use strict';

// for 'let x be y in expr'
// e.g. letIn(some.veryLong(expression).thatMayBe(null), it => it && it.subThing && it.subThing.property)
function letIn(x, f) {
  return f(x);
}

function clamp(x, [lo, hi]) {
  return Math.max(lo, Math.min(x, hi));
}

let extEnabled = true;

document.addEventListener('keydown', event => {
  if (event.ctrlKey && !event.altKey && !event.shiftKey && event.key === 'm') {
    extEnabled = !extEnabled;
    chrome.runtime.sendMessage({ setIconGrayscale: !extEnabled });
  }
});

// Proxy to .addEventListener, except that the listener will not be called while
// the extension is disabled
function addExtensionEventListener(target, eventName, listener, options) {
  const conditionalListener = event => {
    if (!extEnabled) return;
    return listener(event);
  }
  return target.addEventListener(eventName, conditionalListener, options);
}

chrome.storage.sync.get(['enabledPresets', 'customMacros', 'timeout', 'lookbehind'], settings => {
  // Macros come in two flavors:
  // replacements, which are straight text replacements,
  // and commands, like \this{}, which are single-input JS functions
  // Replacements should not contain { or }.

  const macros = {};

  for (const presetName of settings.enabledPresets) {
    const preset = presets[presetName];

    if (!preset) {
      console.warn(`no preset macro '${preset}'`);
      continue;
    }

    for (const macro of preset.macros)
      macros[macro.name] = macro;
  }

  {
    function register(type, name, arg) { macros[name] = macro(type, name, arg); }
    eval(settings.customMacros || '');
  }

  // Call text 'ambiguous' if it is the prefix to more than one macro
  const prefixes = s => new Array(s.length).fill(null).map((_, i) => s.slice(0, i));
  const macroPrefixes = new Set(Object.keys(macros).flatMap(prefixes));
  const isAmbiguous = text => macroPrefixes.has(text);

  // == Editable Elements == //

  // We care about when the user is interacting with an editable element
  // We will first define an API for interacting with 'editable elements'

  /* Is a node editable? */
  function ed_isEditable(node) {
    return ed_kind(node) !== null;
  }

  /* Editable node category */
  function ed_kind(node) {
    if (node.nodeName === '#text' && node.parentNode.isContentEditable)
      return 'text';

    if (node.nodeName === 'TEXTAREA' || (node.nodeName === 'INPUT' && /^(text|email|number|search|tel|url|password)$/i.test(node.type)))
      return 'input';

    return null;
  }

  function ed_getContent(node) {
    switch (ed_kind(node)) {
      case 'text': return node.textContent;
      case 'input': return node.value;
    }
  }

  function ed_setContent(node, text) {
    switch (ed_kind(node)) {
      case 'text': node.textContent = text; break;
      case 'input': node.value = text; break;
    }

    // Notify backbone, Vue, React, etc.
    node.dispatchEvent(new Event('input', { bubbles: true, cancelable: false }));
    node.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }));
  }

  /* get caret position */
  function ed_getCaretOffset(node) {
    switch (ed_kind(node)) {
      case 'text': return document.getSelection().focusOffset;
      case 'input': return node.selectionEnd;
    }
  }

  /* set caret position */
  function ed_setCaretOffset(node, idx) {
    switch (ed_kind(node)) {
      case 'text': document.getSelection().collapse(node, idx); break;
      case 'input': node.selectionStart = node.selectionEnd = idx; break;
    }
  }

  // == Event Handling == //

  // The element that we're typing in
  let target = null;
  // The position of the 'anchor', which is the dual to the caret,
  // together representing the range in which we will be performing
  // text transformations
  let anchorOffset = 0;
  // The last time a key was pressed in the target
  let lastKeypressTime = null;

  // Collapse the anchor to the caret
  function collapseOffsets() {
    if (!target) return;
    const caretOffset = ed_getCaretOffset(target);
    anchorOffset = caretOffset;
  }

  // Clamp the offsets to within valid bounds
  function clampOffsets() {
    if (!target) return;
    const contentLength = ed_getContent(target).length;
    anchorOffset = clamp(anchorOffset, [0, contentLength]);
    caretOffset = clamp(caretOffset, [anchorOffset, contentLength]);
  }

  { /*
    Handle target changes.
    When the user focuses on a new element, we need to update `target` as well
    as the caret and anchor offsets.
    The obvious strategy is to check on each keypress to see if the focus has changed
    and, if so, update `target` and offsets accordingly.
    However, our strategy will instead be to update `target` on every keypress, but only
    update the offsets on click and Tab press.
    This is because Twitter (and therefore perhaps some other sites, too)
    does some weird shit where the tweet box turns into a new element after
    the first character insertion. In this case, we want to update `target`
    but not the offsets.
    To remedy this, we will restrict offset updates to events which are definitely
    changes of focus, like clicks and Tab presses.
    */

    // Check for new target on keydown
    addExtensionEventListener(document, 'keydown', () => {
      const newTarget = (() => {
        const sel = document.getSelection();
        if (sel && sel.focusNode && ed_isEditable(sel.focusNode))
          return sel.focusNode;
        if (ed_isEditable(document.activeElement))
          return document.activeElement;
        return null;
      })();

      if (newTarget && newTarget !== target) {
        target = newTarget;
        return;
      }
    });

    // Update offsets on click and Tab press
    ['click', 'keydown'].forEach(eventName => addExtensionEventListener(document, eventName, event => {
      if (event instanceof KeyboardEvent && event.key !== 'Tab') return;
      collapseOffsets();
      clampOffsets();
    }));

  }

  addExtensionEventListener(document, 'keydown', () => {
    if (!target) return;
    const caretOffset = ed_getCaretOffset(target);

    const now = Date.now();

    // Once enough time has passed, collapse
    if (lastKeypressTime !== null && now - lastKeypressTime > settings.timeout) {
      collapseOffsets();
    }

    // If arrow keys have been pressed, ensure in bounds and collapse
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      clampOffsets();
      collapseOffsets();
    }

    lastKeypressTime = now;
  });

  addExtensionEventListener(document, "keyup", () => {
    if (!target) return;

    const caretOffset = ed_getCaretOffset(target);
    const text = ed_getContent(target);

    // Generate the text slices that we will test for being macros
    function* candidates() {
      for (let truncateAmt = 0; truncateAmt <= settings.lookbehind; truncateAmt++) {
        for (let candidateLength = caretOffset - truncateAmt - anchorOffset; candidateLength >= 1; candidateLength--) {
          const candidateStart = caretOffset - truncateAmt - candidateLength;
          const candidateEnd = caretOffset - truncateAmt - 1;
          const candidate = text.slice(candidateStart, candidateEnd + 1);
          yield { candidate, candidateStart, candidateEnd };
        }
      }
    }

    for (const { candidate, candidateStart, candidateEnd } of candidates()) {
      // Skip if ambiguous and the next letter of the text doesn't resolve the ambiguity
      if (isAmbiguous(candidate) && (!text[candidateEnd + 1] || isAmbiguous(candidate + text[candidateEnd + 1]))) continue;
      if (candidate in macros) {
        const result = macros[candidate].run(
          text,
          {
            nameStart: candidateStart,
            nameEnd: candidateEnd,
          }
        );

        // Allow returning undefined to mean that no changes should be made
        if (result !== undefined) {
          ed_setContent(target, result);
          ed_setCaretOffset(target, caretOffset + (result.length - text.length));
          anchorOffset = caretOffset;
          break;
        }
      }
    }
  });

});

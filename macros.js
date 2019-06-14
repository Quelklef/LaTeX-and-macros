chrome.storage.sync.get(['enabledPresets', 'customReplacements', 'customCommands', 'timeout', 'lookbehind'], items => {
  // Macros come in two flavors:
  // replacements, which are straight text replacements,
  // and commands, like \this{}, which are single-input JS functions
  // Replacements should not contain { or }.

  // These two dictionaries hold the replacements and commands
  // `replacements` is `string => string`, i.e. mapping `\forall` to ∀;
  // `commands` is `string => (string -> string)`, i.e. mapping `\textit` to a command

  const replacements = { };
  const commands = { };

  for (const presetName of items.enabledPresets) {
    const preset = presets[presetName];

    if (!preset) {
      // Skip it
      continue;
    }

    for (const key in preset.replacements)
      replacements[key] = preset.replacements[key];
    for (const key in preset.commands)
      commands[key] = preset.commands[key];
  }

  for (const key in items.customReplacements)
    replacements[key] = items.customReplacements[key];

  // Required for customCommands eval
  function defCommand(name, cmd) {
    commands[name] = cmd;
  }
  eval(items.customCommands);

  // Generate escapes, so \alpha -> α but \\alpha -> \alpha
  for (const key of Object.keys(replacements)) {
    replacements['\\' + key] = key;
  }
  // Commands have no escapes since they will not fire without {}

  // Key lists, sorted by decreasing order of length
  const replacementKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
  const commandKeys = Object.keys(commands).sort((a, b) => b.length - a.length);
  const macroKeys = [].concat(replacementKeys, commandKeys).sort((a, b) => b.length - a.length);

  // Call a key 'ambiguous' if it is the prefix to another macro
  const ambiguousKeys = new Set(macroKeys.map(
    key => // All prefixes of key
      new Array(key.length).fill(0).map((_, i) => key.substring(0, i))
  ).flat());
  function ambiguous(key) {
    return ambiguousKeys.has(key);
  }



  // == Editable Elements == //

  // We care about when the user is interacting with an editable element
  // We will first define an API for interacting with 'editable elements'

  // We need to be able to distinguish what is an 'editable element', so create
  // a predicate:
  function isEditable($node) {
    // Adapted from https://stackoverflow.com/a/26731972/4608364
    return $node.nodeType == 1 && (  // Must be an element
      $node.isContentEditable
      || $node.nodeName == "TEXTAREA"
      || ($node.nodeName == "INPUT" && /^(text|email|number|search|tel|url|password)$/i.test($node.type))
    );
  }

  // Now, we need a replacement operation
  // This should look at the characters to the left of index `n`.
  // If they are equal to `from`, it should replace them with `to` and return true (success)
  // If they are not equal to `from`, it should return false (failure)
  function tryOverwrite($el, n, from, to) {
    const valueAttr =
      ($el.nodeName === "INPUT" || $el.nodeName === "TEXTAREA") ? "value"
      : $el.isContentEditable ? "innerText"
      : (() => { throw ["Cannot overwrite in element ", $el] })();
    
    const [pre, here, post] = split2(getContent($el), n - from.length, n);
    if (here !== from) return false;
    $el[valueAttr] = pre + to + post;
    return true;
  }

  // We'll also need to be able to get the getContent
  function getContent($el) {
    if ($el.nodeName === "INPUT" || $el.nodeName === "TEXTAREA") return $el.value;
    if ($el.isContentEditable) return $el.innerText;
    throw ["Cannot get getContent from element ", $el];
  }

  // Split a string into 3 parts; cut it at indicies x and y
  function split2(string, x, y) {
    return [
      string.substring(0, x),
      string.substring(x, y),
      string.substring(y)
    ];
  }

  function getCursor($el) {
    if ($el.nodeName === "INPUT" || $el.nodeName === "TEXTAREA") return $el.selectionEnd;
    if ($el.isContentEditable) return getCursor_contenteditable($el);
    throw ["Cannot get selection from element ", $el];
  }

  // Not a perfect solution
  // https://stackoverflow.com/a/4812022/4608364
  function getCursor_contenteditable(e){var t,n=0,o=e.ownerDocument||e.document,a=o.defaultView||o.parentWindow;if(void 0!==a.getSelection){if((t=a.getSelection()).rangeCount>0){var i=a.getSelection().getRangeAt(0),r=i.cloneRange();r.selectNodeContents(e),r.setEnd(i.endContainer,i.endOffset),n=r.toString().length}}else if((t=o.selection)&&"Control"!=t.type){var g=t.createRange(),c=o.body.createTextRange();c.moveToElementText(e),c.setEndPoint("EndToEnd",g),n=c.text.length}return n}

  function setCursor($el, pos) {
    if ($el.nodeName === "INPUT" || $el.nodeName === "TEXTAREA") {
      $el.selectionStart = pos;
      $el.selectionEnd = pos;
    } else if ($el.isContentEditable) {
      // https://stackoverflow.com/a/6249440/4608364
      const range = document.createRange();
      if ($el.childNodes.length !== 0) {
        range.setStart($el.childNodes[0], pos);
      } else {
        range.setStart($el, pos);
      }
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      throw ["Cannot set selection for element ", $el];
    }
  }


  // == Event Handling == //

  // Every time `timeout` ms go by without a keypress, `anchor` is set to
  // the current cursor position.
  const timeout = items.timeout;
  let anchor = 0;
  let lastKeypressTime = 0;

  // Tolerance to fast typing
  // Numbers in the 1-4 range are suggested
  // Tolerance /must/ be 1 in order for ambiguous macros to work
  const lookbehind = items.lookbehind;

  document.addEventListener("click", function clickListener() {
    const $focus = document.activeElement;
    if (isEditable($focus))
      anchor = getCursor(document.activeElement) - 1;
  });

  document.addEventListener("keyup", function keyListener(event) {
    const $focus = document.activeElement;
    if (!isEditable($focus)) return;
    const curPos = getCursor($focus);  // "Claim" this value ASAP before it changes
    
    const curTime = +Date.now();
    if (curTime - lastKeypressTime > timeout) {
      anchor = curPos - 1;
    }
    anchor = Math.min(anchor, curPos, getContent($focus).length - 1);
    lastKeypressTime = curTime;

    // If the person is typing fast, we may have missed a cursor position or two
    // Account for this by backtracking and retesting for replacementKeys
    for (let i = 0; i <= lookbehind; i++) {
      const succ = applyMacros($focus, curPos - i, curPos)
      // Break on first macro applied
      if (succ) break;
    }
    
  });

  function applyMacros($focus, n, curPos) {
    // Attempt to apply a macro from the list of replacements and commands
    // Return whether or not any macro was applied
    // Will only apply a single macro; will not collapse macros.
    // `n` is where the replacements should take place. `n` should be one after
    // the lastmost index of the replacement
    // `curPos` is the cursor position

    const content = getContent($focus);

    // Replacements
    for (let i = 0; i < replacementKeys.length; i++) {
      const key = replacementKeys[i];
      // Skip if ambiguous and STILL ambiguous after another letter
      if (ambiguous(key) && (!content[n] || curPos === n || ambiguous(key + content[n]))) continue;
      if (n - key.length < anchor) continue;
      const from = key;
      const to = replacements[key];
      if (tryOverwrite($focus, n, from, to)) {
        setCursor($focus, curPos - from.length + to.length);
        return true;
      }
    }

    // Commands
    if (content[n - 1] === '}') {
      const openBraceIdx = content.substring(0, n).lastIndexOf('{');

      for (let i = 0; i < commandKeys.length; i++) {
        const key = commandKeys[i];
        const argument = content.substring(openBraceIdx + 1, n - 1);
        const from = key + '{' + argument + '}';
        const to = commands[key](argument);
        if (tryOverwrite($focus, n, from, to)) {
          setCursor($focus, curPos - from.length + to.length);
          return true;
        }
      }
    }

    return false;
  }
});

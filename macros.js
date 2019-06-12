// Adapted from https://golopot.github.io/tex-to-unicode/
const replacements = {
  "\\alpha": "α",
  "\\Alpha": "Α",
  "\\beta": "β",
  "\\Beta": "Β",
  "\\gamma": "γ",
  "\\Gamma": "Γ",
  "\\delta": "δ",
  "\\Delta": "Δ",
  "\\epsilon": "ϵ",
  "\\Epsilon": "Ε",
  "\\zeta": "ζ",
  "\\Zeta": "Ζ",
  "\\eta": "η",
  "\\Eta": "Η",
  "\\theta": "θ",
  "\\Theta": "Θ",
  "\\kappa": "κ",
  "\\Kappa": "Κ",
  "\\lambda": "λ",
  "\\Lambda": "Λ",
  "\\mu": "μ",
  "\\Mu": "Μ",
  "\\nu": "ν",
  "\\Nu": "Ν",
  "\\xi": "ξ",
  "\\Xi": "Ξ",
  "\\omicron": "ο",
  "\\Omicron": "Ο",
  "\\pi": "π",
  "\\Pi": "Π",
  "\\rho": "ρ",
  "\\Rho": "Ρ",
  "\\sigma": "σ",
  "\\Sigma": "Σ",
  "\\tau": "τ",
  "\\Tau": "Τ",
  "\\upsilon": "υ",
  "\\Upsilon": "Υ",
  "\\phi": "ϕ",
  "\\Phi": "Φ",
  "\\chi": "χ",
  "\\Chi": "Χ",
  "\\psi": "ψ",
  "\\Psi": "Ψ",
  "\\omega": "ω",
  "\\Omega": "Ω",
  "\\varepsilon": "ε",
  "\\varkappa": "ϰ",
  "\\varphi": "φ",
  "\\varpi": "ϖ",
  "\\varrho": "ϱ",
  "\\varsigma": "ς",
  "\\vartheta": "ϑ",
  "\\neq": "≠",
  "\\equiv": "≡",
  "\\not\\equiv": "≢",
  "\\leq": "≤",
  "\\geq": "≥",
  "\\leqq": "≦",
  "\\geqq": "≧",
  "\\lneqq": "≨",
  "\\gneqq": "≩",
  "\\leqslant": "⩽",
  "\\geqslant": "⩾",
  "\\ll": "≪",
  "\\gg": "≫",
  "\\nless": "≮",
  "\\ngtr": "≯",
  "\\nleq": "≰",
  "\\ngeq": "≱",
  "\\lessequivlnt": "≲",
  "\\greaterequivlnt": "≳",
  "\\prec": "≺",
  "\\succ": "≻",
  "\\preccurlyeq": "≼",
  "\\succcurlyeq": "≽",
  "\\precapprox": "≾",
  "\\succapprox": "≿",
  "\\nprec": "⊀",
  "\\nsucc": "⊁",
  "\\sim": "∼",
  "\\not\\sim": "≁",
  "\\simeq": "≃",
  "\\not\\simeq": "≄",
  "\\backsim": "∽",
  "\\lazysinv": "∾",
  "\\wr": "≀",
  "\\cong": "≅",
  "\\not\\cong": "≇",
  "\\approx": "≈",
  "\\not\\approx": "≉",
  "\\approxeq": "≊",
  "\\approxnotequal": "≆",
  "\\tildetrpl": "≋",
  "\\allequal": "≌",
  "\\asymp": "≍",
  "\\doteq": "≐",
  "\\doteqdot": "≑",
  "\\lneq": "⪇",
  "\\gneq": "⪈",
  "\\preceq": "⪯",
  "\\succeq": "⪰",
  "\\precneqq": "⪵",
  "\\succneqq": "⪶",
  "\\emptyset": "∅",
  "\\in": "∈",
  "\\notin": "∉",
  "\\not\\in": "∉",
  "\\ni": "∋",
  "\\not\\ni": "∌",
  "\\subset": "⊂",
  "\\subseteq": "⊆",
  "\\not\\subset": "⊄",
  "\\not\\subseteq": "⊈",
  "\\supset": "⊃",
  "\\supseteq": "⊇",
  "\\not\\supset": "⊅",
  "\\not\\supseteq": "⊉",
  "\\subsetneq": "⊊",
  "\\supsetneq": "⊋",
  "\\exists": "∃",
  "\\nexists": "∄",
  "\\not\\exists": "∄",
  "\\forall": "∀",
  "\\aleph": "ℵ",
  "\\beth": "ℶ",
  "\\neg": "¬",
  "\\wedge": "∧",
  "\\vee": "∨",
  "\\veebar": "⊻",
  "\\land": "∧",
  "\\lor": "∨",
  "\\top": "⊤",
  "\\bot": "⊥",
  "\\cup": "∪",
  "\\cap": "∩",
  "\\bigcup": "⋃",
  "\\bigcap": "⋂",
  "\\setminus": "∖",
  "\\therefore": "∴",
  "\\because": "∵",
  "\\Box": "□",
  "\\models": "⊨",
  "\\vdash": "⊢",
  "\\rightarrow": "→",
  "\\Rightarrow": "⇒",
  "\\implies": "⇒",
  "\\leftarrow": "←",
  "\\Leftarrow": "⇐",
  "\\uparrow": "↑",
  "\\Uparrow": "⇑",
  "\\downarrow": "↓",
  "\\Downarrow": "⇓",
  "\\nwarrow": "↖",
  "\\nearrow": "↗",
  "\\searrow": "↘",
  "\\swarrow": "↙",
  "\\mapsto": "↦",
  "\\to": "→",
  "\\leftrightarrow": "↔",
  "\\hookleftarrow": "↩",
  "\\Leftrightarrow": "⇔",
  "\\rightarrowtail": "↣",
  "\\leftarrowtail": "↢",
  "\\twoheadrightarrow": "↠",
  "\\twoheadleftarrow": "↞",
  "\\hookrightarrow": "↪",
  "\\hookleftarrow": "↩",
  "\\rightsquigarrow": "⇝",
  "\\rightleftharpoons": "⇌",
  "\\leftrightharpoons": "⇋",
  "\\rightharpoonup": "⇀",
  "\\rightharpoondown": "⇁",
  "\\times": "×",
  "\\div": "÷",
  "\\infty": "∞",
  "\\nabla": "∇",
  "\\partial": "∂",
  "\\sum": "∑",
  "\\prod": "∏",
  "\\coprod": "∐",
  "\\int": "∫",
  "\\iint": "∬",
  "\\iiint": "∭",
  "\\iiiint": "⨌",
  "\\oint": "∮",
  "\\surfintegral": "∯",
  "\\volintegral": "∰",
  "\\Re": "ℜ",
  "\\Im": "ℑ",
  "\\wp": "℘",
  "\\mp": "∓",
  "\\langle": "⟨",
  "\\rangle": "⟩",
  "\\lfloor": "⌊",
  "\\rfloor": "⌋",
  "\\lceil": "⌈",
  "\\rceil": "⌉",
  "\\mathbb{a}": "𝕒",
  "\\mathbb{A}": "𝔸",
  "\\mathbb{b}": "𝕓",
  "\\mathbb{B}": "𝔹",
  "\\mathbb{c}": "𝕔",
  "\\mathbb{C}": "ℂ",
  "\\mathbb{d}": "𝕕",
  "\\mathbb{D}": "𝔻",
  "\\mathbb{e}": "𝕖",
  "\\mathbb{E}": "𝔼",
  "\\mathbb{f}": "𝕗",
  "\\mathbb{F}": "𝔽",
  "\\mathbb{g}": "𝕘",
  "\\mathbb{G}": "𝔾",
  "\\mathbb{h}": "𝕙",
  "\\mathbb{H}": "ℍ",
  "\\mathbb{i}": "𝕚",
  "\\mathbb{I}": "𝕀",
  "\\mathbb{j}": "𝕛",
  "\\mathbb{J}": "𝕁",
  "\\mathbb{k}": "𝕜",
  "\\mathbb{K}": "𝕂",
  "\\mathbb{l}": "𝕝",
  "\\mathbb{L}": "𝕃",
  "\\mathbb{m}": "𝕞",
  "\\mathbb{M}": "𝕄",
  "\\mathbb{n}": "𝕟",
  "\\mathbb{N}": "ℕ",
  "\\mathbb{o}": "𝕠",
  "\\mathbb{O}": "𝕆",
  "\\mathbb{p}": "𝕡",
  "\\mathbb{P}": "ℙ",
  "\\mathbb{q}": "𝕢",
  "\\mathbb{Q}": "ℚ",
  "\\mathbb{r}": "𝕣",
  "\\mathbb{R}": "ℝ",
  "\\mathbb{s}": "𝕤",
  "\\mathbb{S}": "𝕊",
  "\\mathbb{t}": "𝕥",
  "\\mathbb{T}": "𝕋",
  "\\mathbb{u}": "𝕦",
  "\\mathbb{U}": "𝕌",
  "\\mathbb{v}": "𝕧",
  "\\mathbb{V}": "𝕍",
  "\\mathbb{x}": "𝕩",
  "\\mathbb{X}": "𝕏",
  "\\mathbb{y}": "𝕪",
  "\\mathbb{Y}": "𝕐",
  "\\mathbb{z}": "𝕫",
  "\\mathbb{Z}": "ℤ",
  "\\mathbb{0}": "𝟘",
  "\\mathbb{1}": "𝟙",
  "\\mathbb{2}": "𝟚",
  "\\mathbb{3}": "𝟛",
  "\\mathbb{4}": "𝟜",
  "\\mathbb{5}": "𝟝",
  "\\mathbb{6}": "𝟞",
  "\\mathbb{7}": "𝟟",
  "\\mathbb{8}": "𝟠",
  "\\mathbb{9}": "𝟡",
  "\\mathfrak{a}": "𝔞",
  "\\mathfrak{A}": "𝔄",
  "\\mathfrak{b}": "𝔟",
  "\\mathfrak{B}": "𝔅",
  "\\mathfrak{c}": "𝔠",
  "\\mathfrak{C}": "ℭ",
  "\\mathfrak{d}": "𝔡",
  "\\mathfrak{D}": "𝔇",
  "\\mathfrak{e}": "𝔢",
  "\\mathfrak{E}": "𝔈",
  "\\mathfrak{f}": "𝔣",
  "\\mathfrak{F}": "𝔉",
  "\\mathfrak{g}": "𝔤",
  "\\mathfrak{G}": "𝔊",
  "\\mathfrak{h}": "𝔥",
  "\\mathfrak{H}": "ℌ",
  "\\mathfrak{i}": "𝔦",
  "\\mathfrak{I}": "ℑ",
  "\\mathfrak{j}": "𝔧",
  "\\mathfrak{J}": "𝔍",
  "\\mathfrak{k}": "𝔨",
  "\\mathfrak{K}": "𝔎",
  "\\mathfrak{l}": "𝔩",
  "\\mathfrak{L}": "𝔏",
  "\\mathfrak{m}": "𝔪",
  "\\mathfrak{M}": "𝔐",
  "\\mathfrak{n}": "𝔫",
  "\\mathfrak{N}": "𝔑",
  "\\mathfrak{o}": "𝔬",
  "\\mathfrak{O}": "𝔒",
  "\\mathfrak{p}": "𝔭",
  "\\mathfrak{P}": "𝔓",
  "\\mathfrak{q}": "𝔮",
  "\\mathfrak{Q}": "𝔔",
  "\\mathfrak{r}": "𝔯",
  "\\mathfrak{R}": "ℜ",
  "\\mathfrak{s}": "𝔰",
  "\\mathfrak{S}": "𝔖",
  "\\mathfrak{t}": "𝔱",
  "\\mathfrak{T}": "𝔗",
  "\\mathfrak{u}": "𝔲",
  "\\mathfrak{U}": "𝔘",
  "\\mathfrak{v}": "𝔳",
  "\\mathfrak{V}": "𝔙",
  "\\mathfrak{x}": "𝔵",
  "\\mathfrak{X}": "𝔛",
  "\\mathfrak{y}": "𝔶",
  "\\mathfrak{Y}": "𝔜",
  "\\mathfrak{z}": "𝔷",
  "\\mathfrak{Z}": "ℨ",
  "_0": "₀",
  "^0": "⁰",
  "_1": "₁",
  "^1": "¹",
  "_2": "₂",
  "^2": "²",
  "_3": "₃",
  "^3": "³",
  "_4": "₄",
  "^4": "⁴",
  "_5": "₅",
  "^5": "⁵",
  "_6": "₆",
  "^6": "⁶",
  "_7": "₇",
  "^7": "⁷",
  "_8": "₈",
  "^8": "⁸",
  "_9": "₉",
  "^9": "⁹",
  "_+": "⁺",
  "^+": "⁺",
  "_-": "⁻",
  "^-": "⁻",
  "_(": "₍",
  "^(": "⁽",
  "_)": "₎",
  "^)": "⁾",
  "_a": "ₐ",
  "^a": "ᵃ",
  "^b": "ᵇ",
  "^c": "ᶜ",
  "^d": "ᵈ",
  "_e": "ₑ",
  "^e": "ᵉ",
  "^f": "ᶠ",
  "^g": "ᵍ",
  "_h": "ₕ",
  "^h": "ʰ",
  "_i": "ᵢ",
  "^i": "ⁱ",
  "_j": "ⱼ",
  "^j": "ʲ",
  "_k": "ₖ",
  "^k": "ᵏ",
  "_l": "ₗ",
  "^l": "ˡ",
  "_m": "ₘ",
  "^m": "ᵐ",
  "_n": "ₙ",
  "^n": "ⁿ",
  "_o": "ₒ",
  "^o": "ᵒ",
  "_p": "ₚ",
  "^p": "ᵖ",
  "_r": "ᵣ",
  "^r": "ʳ",
  "_s": "ₛ",
  "^s": "ˢ",
  "_t": "ₜ",
  "^t": "ᵗ",
  "_u": "ᵤ",
  "^u": "ᵘ",
  "_v": "ᵥ",
  "^v": "ᵛ",
  "^w": "ʷ",
  "_x": "ₓ",
  "^x": "ˣ",
  "^y": "ʸ",
  "^z": "ᶻ",
  "\\mp": "∓",
  "\\dotplus": "∔",
  "\\bullet": "∙",
  "\\cdot": "⋅",
  "\\oplus": "⊕",
  "\\ominus": "⊖",
  "\\otimes": "⊗",
  "\\oslash": "⊘",
  "\\odot": "⊙",
  "\\circ": "∘",
  "^\\circ": "°",
  "\\surd": "√",
  "\\propto": "∝",
  "\\angle": "∠",
  "\\measuredangle": "∡",
  "\\sphericalangle": "∢",
  "\\mid": "∣",
  "\\nmid": "∤",
  "\\not\\mid": "∤",
  "\\parallel": "∥",
  "\\nparallel": "∦",
  "\\not\\parallel": "∦",
  "\\flat": "♭",
  "\\natural": "♮",
  "\\sharp": "♯"
}
// Generate escapes, so \alpha -> α but \\alpha -> \alpha
for (const macro of Object.keys(replacements)) {
  replacements[macro[0] + macro] = macro;
}
// Key list, sorted by decreasing order of length
const macros = Object.keys(replacements).sort((a, b) => b.length - a.length);
// Call a macro 'ambiguous' if it is the prefix to another macro
// Build the table of whether or not a macro is ambiguous
/* const ambiguous = (() => {
  let ambiguous = {};
  for (const macro of macros)
    ambiguous[macro] = macros.some(m => m !== macro && m.startsWith(macro));
  return ambiguous;
})(); */



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
  
  const [pre, here, post] = split2($el[valueAttr], n - from.length, n);
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
    range.setStart($el.childNodes[0], pos);
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
const timeout = 1000;
let anchor = 0;
let lastKeypressTime = 0;

// Tolerance to fast typing
// Numbers in the 0-3 range are suggested
const tolerance = 1;

document.addEventListener("keyup", function keyListener(event) {
  const $focus = document.activeElement;
  const curPos = getCursor($focus);  // "Claim" this value ASAP before it changes
  if (!isEditable($focus)) return;
  
  const curTime = +Date.now();
  if (curTime - lastKeypressTime > timeout) {
    anchor = curPos;
  }
  anchor = Math.min(anchor, getContent($focus).length - 1);
  lastKeypressTime = curTime;
  
  // If the person is typing fast, we may have missed a cursor position or two
  // Account for this by backtracking and retesting for macros
  for (let i = 0; i <= tolerance; i++) {
    const succ = applyMacros($focus, curPos - i, curPos)
    // Break on first macro applied
    if (succ) break;
  }
  
});

function applyMacros($focus, n, curPos) {
  // Attempt to apply a macro from the list of replacements
  // Return whether or not any macro was applied
  // `n` is where the replacements should take place
  // `curPos` is the cursor position
  for (let i = 0; i < macros.length; i++) {
    const macro = macros[i];
    if (curPos - macro.length < anchor) continue;
    const from = macro;
    const to = replacements[macro];
    if (tryOverwrite($focus, n, from, to)) {
      setCursor($focus, curPos - from.length + to.length);
      return true;  // Do not continue to collapse
    }
  }
  return false;
}

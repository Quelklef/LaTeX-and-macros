// Macros are adapted from https://golopot.github.io/tex-to-unicode/

// Macros come in two flavors:
// replacements, which are straight text replacements,
// and commands, like \this{}, which are single-input JS functions
// Replacements should not contain { or }.

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
  "_0": "₀", "^0": "⁰", "_1": "₁", "^1": "¹", "_2": "₂", "^2": "²", "_3": "₃",
  "^3": "³", "_4": "₄", "^4": "⁴", "_5": "₅", "^5": "⁵", "_6": "₆", "^6": "⁶",
  "_7": "₇", "^7": "⁷", "_8": "₈", "^8": "⁸", "_9": "₉", "^9": "⁹", "_+": "⁺",
  "^+": "⁺", "_-": "⁻", "^-": "⁻", "_(": "₍", "^(": "⁽", "_)": "₎", "^)": "⁾",
  "_a": "ₐ", "^a": "ᵃ", "^b": "ᵇ", "^c": "ᶜ", "^d": "ᵈ", "_e": "ₑ", "^e": "ᵉ",
  "^f": "ᶠ", "^g": "ᵍ", "_h": "ₕ", "^h": "ʰ", "_i": "ᵢ", "^i": "ⁱ", "_j": "ⱼ",
  "^j": "ʲ", "_k": "ₖ", "^k": "ᵏ", "_l": "ₗ", "^l": "ˡ", "_m": "ₘ", "^m": "ᵐ",
  "_n": "ₙ", "^n": "ⁿ", "_o": "ₒ", "^o": "ᵒ", "_p": "ₚ", "^p": "ᵖ", "_r": "ᵣ",
  "^r": "ʳ", "_s": "ₛ", "^s": "ˢ", "_t": "ₜ", "^t": "ᵗ", "_u": "ᵤ", "^u": "ᵘ",
  "_v": "ᵥ", "^v": "ᵛ", "^w": "ʷ", "_x": "ₓ", "^x": "ˣ", "^y": "ʸ", "^z": "ᶻ",
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

function doReplacements(text, dict) {
  // Apply single-letter replacements to text
  return Array.from(text).map(c => c in dict ? dict[c] : c).join('');
}

const commands = {
  "\\mathbb": text => doReplacements(text, {
    "a": "𝕒", "A": "𝔸", "b": "𝕓", "B": "𝔹", "c": "𝕔", "C": "ℂ", "d": "𝕕",
    "D": "𝔻", "e": "𝕖", "E": "𝔼", "f": "𝕗", "F": "𝔽", "g": "𝕘", "G": "𝔾",
    "h": "𝕙", "H": "ℍ", "i": "𝕚", "I": "𝕀", "j": "𝕛", "J": "𝕁", "k": "𝕜",
    "K": "𝕂", "l": "𝕝", "L": "𝕃", "m": "𝕞", "M": "𝕄", "n": "𝕟", "N": "ℕ",
    "o": "𝕠", "O": "𝕆", "p": "𝕡", "P": "ℙ", "q": "𝕢", "Q": "ℚ", "r": "𝕣",
    "R": "ℝ", "s": "𝕤", "S": "𝕊", "t": "𝕥", "T": "𝕋", "u": "𝕦", "U": "𝕌",
    "v": "𝕧", "V": "𝕍", "x": "𝕩", "X": "𝕏", "y": "𝕪", "Y": "𝕐", "z": "𝕫",
    "Z": "ℤ", "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝",
    "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
  }),

  "\\mathfrak": text => doReplacements(text, {
    "a": "𝔞", "A": "𝔄", "b": "𝔟", "B": "𝔅", "c": "𝔠", "C": "ℭ", "d": "𝔡",
    "D": "𝔇", "e": "𝔢", "E": "𝔈", "f": "𝔣", "F": "𝔉", "g": "𝔤", "G": "𝔊",
    "h": "𝔥", "H": "ℌ", "i": "𝔦", "I": "ℑ", "j": "𝔧", "J": "𝔍", "k": "𝔨",
    "K": "𝔎", "l": "𝔩", "L": "𝔏", "m": "𝔪", "M": "𝔐", "n": "𝔫", "N": "𝔑",
    "o": "𝔬", "O": "𝔒", "p": "𝔭", "P": "𝔓", "q": "𝔮", "Q": "𝔔", "r": "𝔯",
    "R": "ℜ", "s": "𝔰", "S": "𝔖", "t": "𝔱", "T": "𝔗", "u": "𝔲", "U": "𝔘",
    "v": "𝔳", "V": "𝔙", "x": "𝔵", "X": "𝔛", "y": "𝔶", "Y": "𝔜", "z": "𝔷",
    "Z": "ℨ",
  }),

  "\\textit": text => doReplacements(text, {
    "a": "𝘢", "A": "𝘈", "b": "𝘣", "B": "𝘉", "c": "𝘤", "C": "𝘊", "d": "𝘥",
    "D": "𝘋", "e": "𝘦", "E": "𝘌", "f": "𝘧", "F": "𝘍", "g": "𝘨", "G": "𝘎",
    "h": "𝘩", "H": "𝘏", "i": "𝘪", "I": "𝘐", "j": "𝘫", "J": "𝘑", "k": "𝘬",
    "K": "𝘒", "l": "𝘭", "L": "𝘓", "m": "𝘮", "M": "𝘔", "n": "𝘯", "N": "𝘕",
    "o": "𝘰", "O": "𝘖", "p": "𝘱", "P": "𝘗", "q": "𝘲", "Q": "𝘘", "r": "𝘳",
    "R": "𝘙", "s": "𝘴", "S": "𝘚", "t": "𝘵", "T": "𝘛", "u": "𝘶", "U": "𝘜",
    "v": "𝘷", "V": "𝘝", "w": "𝘸", "W": "𝘞", "x": "𝘹", "X": "𝘟", "y": "𝘺",
    "Y": "𝘠", "z": "𝘻", "Z": "𝘡",

    "𝗮": "𝙖", "𝗔": "𝘼", "𝗯": "𝙗", "𝗕": "𝘽", "𝗰": "𝙘", "𝗖": "𝘾", "𝗱": "𝙙",
    "𝗗": "𝘿", "𝗲": "𝙚", "𝗘": "𝙀", "𝗳": "𝙛", "𝗙": "𝙁", "𝗴": "𝙜", "𝗚": "𝙂",
    "𝗵": "𝙝", "𝗛": "𝙃", "𝗶": "𝙞", "𝗜": "𝙄", "𝗷": "𝙟", "𝗝": "𝙅", "𝗸": "𝙠",
    "𝗞": "𝙆", "𝗹": "𝙡", "𝗟": "𝙇", "𝗺": "𝙢", "𝗠": "𝙈", "𝗻": "𝙣", "𝗡": "𝙉",
    "𝗼": "𝙤", "𝗢": "𝙊", "𝗽": "𝙥", "𝗣": "𝙋", "𝗾": "𝙦", "𝗤": "𝙌", "𝗿": "𝙧",
    "𝗥": "𝙍", "𝘀": "𝙨", "𝗦": "𝙎", "𝘁": "𝙩", "𝗧": "𝙏", "𝘂": "𝙪", "𝗨": "𝙐",
    "𝘃": "𝙫", "𝗩": "𝙑", "𝘄": "𝙬", "𝗪": "𝙒", "𝘅": "𝙭", "𝗫": "𝙓", "𝘆": "𝙮",
    "𝗬": "𝙔", "𝘇": "𝙯", "𝗭": "𝙕",
  }),

  "\\textbf": text => doReplacements(text, {
    "a": "𝗮", "A": "𝗔", "b": "𝗯", "B": "𝗕", "c": "𝗰", "C": "𝗖", "d": "𝗱",
    "D": "𝗗", "e": "𝗲", "E": "𝗘", "f": "𝗳", "F": "𝗙", "g": "𝗴", "G": "𝗚",
    "h": "𝗵", "H": "𝗛", "i": "𝗶", "I": "𝗜", "j": "𝗷", "J": "𝗝", "k": "𝗸",
    "K": "𝗞", "l": "𝗹", "L": "𝗟", "m": "𝗺", "M": "𝗠", "n": "𝗻", "N": "𝗡",
    "o": "𝗼", "O": "𝗢", "p": "𝗽", "P": "𝗣", "q": "𝗾", "Q": "𝗤", "r": "𝗿",
    "R": "𝗥", "s": "𝘀", "S": "𝗦", "t": "𝘁", "T": "𝗧", "u": "𝘂", "U": "𝗨",
    "v": "𝘃", "V": "𝗩", "w": "𝘄", "W": "𝗪", "x": "𝘅", "X": "𝗫", "y": "𝘆",
    "Y": "𝗬", "z": "𝘇", "Z": "𝗭",

    "𝘢": "𝙖", "𝘈": "𝘼", "𝘣": "𝙗", "𝘉": "𝘽", "𝘤": "𝙘", "𝘊": "𝘾", "𝘥": "𝙙",
    "𝘋": "𝘿", "𝘦": "𝙚", "𝘌": "𝙀", "𝘧": "𝙛", "𝘍": "𝙁", "𝘨": "𝙜", "𝘎": "𝙂",
    "𝘩": "𝙝", "𝘏": "𝙃", "𝘪": "𝙞", "𝘐": "𝙄", "𝘫": "𝙟", "𝘑": "𝙅", "𝘬": "𝙠",
    "𝘒": "𝙆", "𝘭": "𝙡", "𝘓": "𝙇", "𝘮": "𝙢", "𝘔": "𝙈", "𝘯": "𝙣", "𝘕": "𝙉",
    "𝘰": "𝙤", "𝘖": "𝙊", "𝘱": "𝙥", "𝘗": "𝙋", "𝘲": "𝙦", "𝘘": "𝙌", "𝘳": "𝙧",
    "𝘙": "𝙍", "𝘴": "𝙨", "𝘚": "𝙎", "𝘵": "𝙩", "𝘛": "𝙏", "𝘶": "𝙪", "𝘜": "𝙐",
    "𝘷": "𝙫", "𝘝": "𝙑", "𝘸": "𝙬", "𝘞": "𝙒", "𝘹": "𝙭", "𝘟": "𝙓", "𝘺": "𝙮",
    "𝘠": "𝙔", "𝘻": "𝙯", "𝘡": "𝙕",
  }),
}

// Generate escapes, so \alpha -> α but \\alpha -> \alpha
for (const key of Object.keys(replacements)) {
  replacements[key[0] + key] = key;
}
// Commands have no escapes since they will not fire without {}

// Key list, sorted by decreasing order of length
const replacementKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
const commandKeys = Object.keys(commands).sort((a, b) => b.length - a.length);
// Call a macro 'ambiguous' if it is the prefix to another macro
// Build the table of whether or not a macro is ambiguous
/* const ambiguous = (() => {
  let ambiguous = {};
  for (const macro of replacementKeys)
    ambiguous[macro] = replacementKeys.some(m => m !== macro && m.startsWith(macro));
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
const timeout = 1500;
let anchor = 0;
let lastKeypressTime = 0;

// Tolerance to fast typing
// Numbers in the 0-3 range are suggested
const tolerance = 1;

document.addEventListener("click", function clickListener() {
  anchor = getCursor(document.activeElement) - 1;
});

document.addEventListener("keyup", function keyListener(event) {
  const $focus = document.activeElement;
  const curPos = getCursor($focus);  // "Claim" this value ASAP before it changes
  if (!isEditable($focus)) return;
  
  const curTime = +Date.now();
  if (curTime - lastKeypressTime > timeout) {
    anchor = curPos - 1;
  }
  anchor = Math.min(anchor, curPos, getContent($focus).length - 1);
  lastKeypressTime = curTime;
  
  // If the person is typing fast, we may have missed a cursor position or two
  // Account for this by backtracking and retesting for replacementKeys
  for (let i = 0; i <= tolerance; i++) {
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

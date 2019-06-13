// Many of these macros come from https://golopot.github.io/tex-to-unicode/

function doReplacements(text, dict) {
  // Apply single-letter replacements to text
  return Array.from(text).map(c => c in dict ? dict[c] : c).join('');
}

const presets = {};
function registerPreset(preset) {
  presets[preset.name] = preset;
  return preset;
}

// ==  Letter mappins shared between presets == //

const superscripts = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶",
  "7": "⁷", "8": "⁸", "9": "⁹",

  "+": "⁺", "-": "⁻", "(": "⁽", ")": "⁾", "a": "ᵃ", "b": "ᵇ", "c": "ᶜ",
  "d": "ᵈ", "e": "ᵉ", "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ⁱ", "j": "ʲ",
  "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ", "p": "ᵖ", "r": "ʳ",
  "s": "ˢ", "t": "ᵗ", "u": "ᵘ", "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ",
  "z": "ᶻ",
};

const subscripts = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆",
  "7": "₇", "8": "₈", "9": "₉",

  "+": "⁺", "-": "⁻", "(": "₍", ")": "₎", "a": "ₐ", "e": "ₑ", "h": "ₕ",
  "i": "ᵢ", "j": "ⱼ", "k": "ₖ", "l": "ₗ", "m": "ₘ", "n": "ₙ", "o": "ₒ",
  "p": "ₚ", "r": "ᵣ", "s": "ₛ", "t": "ₜ", "u": "ᵤ", "v": "ᵥ", "x": "ₓ",
}

const math_letters = {
  "a": "𝑎", "A": "𝐴", "b": "𝑏", "B": "𝐵", "c": "𝑐", "C": "𝐶", "d": "𝑑",
  "D": "𝐷", "e": "𝑒", "E": "𝐸", "f": "𝑓", "F": "𝐹", "g": "𝑔", "G": "𝐺",
  "h": "ℎ", "H": "𝐻", "i": "𝑖", "I": "𝐼", "j": "𝑗", "J": "𝐽", "k": "𝑘",
  "K": "𝐾", "l": "𝑙", "L": "𝐿", "m": "𝑚", "M": "𝑀", "n": "𝑛", "N": "𝑁",
  "o": "𝑜", "O": "𝑂", "p": "𝑝", "P": "𝑃", "q": "𝑞", "Q": "𝑄", "r": "𝑟",
  "R": "𝑅", "s": "𝑠", "S": "𝑆", "t": "𝑡", "T": "𝑇", "u": "𝑢", "U": "𝑈",
  "v": "𝑣", "V": "𝑉", "w": "𝑤", "W": "𝑊", "x": "𝑥", "X": "𝑋", "y": "𝑦",
  "Y": "𝑌", "z": "𝑧", "Z": "𝑍",
}

const blackboard_letters = {
  "a": "𝕒", "A": "𝔸", "b": "𝕓", "B": "𝔹", "c": "𝕔", "C": "ℂ", "d": "𝕕",
  "D": "𝔻", "e": "𝕖", "E": "𝔼", "f": "𝕗", "F": "𝔽", "g": "𝕘", "G": "𝔾",
  "h": "𝕙", "H": "ℍ", "i": "𝕚", "I": "𝕀", "j": "𝕛", "J": "𝕁", "k": "𝕜",
  "K": "𝕂", "l": "𝕝", "L": "𝕃", "m": "𝕞", "M": "𝕄", "n": "𝕟", "N": "ℕ",
  "o": "𝕠", "O": "𝕆", "p": "𝕡", "P": "ℙ", "q": "𝕢", "Q": "ℚ", "r": "𝕣",
  "R": "ℝ", "s": "𝕤", "S": "𝕊", "t": "𝕥", "T": "𝕋", "u": "𝕦", "U": "𝕌",
  "v": "𝕧", "V": "𝕍", "x": "𝕩", "X": "𝕏", "y": "𝕪", "Y": "𝕐", "z": "𝕫",
  "Z": "ℤ", "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝",
  "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
}

const fraktur_letters = {
  "a": "𝔞", "A": "𝔄", "b": "𝔟", "B": "𝔅", "c": "𝔠", "C": "ℭ", "d": "𝔡",
  "D": "𝔇", "e": "𝔢", "E": "𝔈", "f": "𝔣", "F": "𝔉", "g": "𝔤", "G": "𝔊",
  "h": "𝔥", "H": "ℌ", "i": "𝔦", "I": "ℑ", "j": "𝔧", "J": "𝔍", "k": "𝔨",
  "K": "𝔎", "l": "𝔩", "L": "𝔏", "m": "𝔪", "M": "𝔐", "n": "𝔫", "N": "𝔑",
  "o": "𝔬", "O": "𝔒", "p": "𝔭", "P": "𝔓", "q": "𝔮", "Q": "𝔔", "r": "𝔯",
  "R": "ℜ", "s": "𝔰", "S": "𝔖", "t": "𝔱", "T": "𝔗", "u": "𝔲", "U": "𝔘",
  "v": "𝔳", "V": "𝔙", "x": "𝔵", "X": "𝔛", "y": "𝔶", "Y": "𝔜", "z": "𝔷",
  "Z": "ℨ",
}

const script_letters = {
  "a": "𝒶", "A": "𝒜", "b": "𝒷", "B": "ℬ", "c": "𝒸", "C": "𝒞", "d": "𝒹",
  "D": "𝒟", "e": "ℯ", "E": "ℰ", "f": "𝒻", "F": "ℱ", "g": "ℊ", "G": "𝒢",
  "h": "𝒽", "H": "ℋ", "i": "𝒾", "I": "ℐ", "j": "𝒿", "J": "𝒥", "k": "𝓀",
  "K": "𝒦", "l": "𝓁", "L": "ℒ", "m": "𝓂", "M": "ℳ", "n": "𝓃", "N": "𝒩",
  "o": "ℴ", "O": "𝒪", "p": "𝓅", "P": "𝒫", "q": "𝓆", "Q": "𝒬", "r": "𝓇",
  "R": "ℛ", "s": "𝓈", "S": "𝒮", "t": "𝓉", "T": "𝒯", "u": "𝓊", "U": "𝒰",
  "v": "𝓋", "V": "𝒱", "w": "𝓌", "W": "𝒲", "x": "𝓍", "X": "𝒳", "y": "𝓎",
  "Y": "𝒴", "z": "𝓏", "Z": "𝒵",
}

const calligraphic_letters = {
  "a": "𝓪", "A": "𝓐", "b": "𝓫", "B": "𝓑", "c": "𝓬", "C": "𝓒", "d": "𝓭",
  "D": "𝓓", "e": "𝓮", "E": "𝓔", "f": "𝓯", "F": "𝓕", "g": "𝓰", "G": "𝓖",
  "h": "𝓱", "H": "𝓗", "i": "𝓲", "I": "𝓘", "j": "𝓳", "J": "𝓙", "k": "𝓴",
  "K": "𝓚", "l": "𝓵", "L": "𝓛", "m": "𝓶", "M": "𝓜", "n": "𝓷", "N": "𝓝",
  "o": "𝓸", "O": "𝓞", "p": "𝓹", "P": "𝓟", "q": "𝓺", "Q": "𝓠", "r": "𝓻",
  "R": "𝓡", "s": "𝓼", "S": "𝓢", "t": "𝓽", "T": "𝓣", "u": "𝓾", "U": "𝓤",
  "v": "𝓿", "V": "𝓥", "w": "𝔀", "W": "𝓦", "x": "𝔁", "X": "𝓧", "y": "𝔂",
  "Y": "𝓨", "z": "𝔃", "Z": "𝓩",
}

const italic_letters = {
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
}

const bold_letters = {
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
}



// == General Symbol Preset == //

const preset_general = registerPreset({
  "name": "General Symbols",
  "replacements": {
    "--": "—",
    "->": "→",
    "<-": "←",
  },
  "commands": {
    "\\italic": text => doReplacements(text, italic_letters),
    "\\bold": text => doReplacements(text, bold_letters),
  },
});


// == Sub- and Super-script Preset == //

const preset_sub_super = registerPreset({
  "name": "Sub/Super Scripts",
  "replacements": {},
  "commands": {},
});

for (const key in subscripts)
  preset_sub_super.replacements["_" + key] = subscripts[key];
for (const key in superscripts)
  preset_sub_super.replacements["^" + key] = superscripts[key];


// == LaTeX Preset == //

const math_letter_replacements = {};
for (const letter in math_letters)
  math_letter_replacements["\\" + letter] = math_letters[letter];

const preset_latex = registerPreset({
  "name": "LaTeX/Math",
  "replacements": {
    ...preset_sub_super.replacements,
    ...math_letter_replacements,

    "\\alpha"  : "α", "\\Alpha"  : "Α",
    "\\beta"   : "β", "\\Beta"   : "Β",
    "\\gamma"  : "γ", "\\Gamma"  : "Γ",
    "\\delta"  : "δ", "\\Delta"  : "Δ",
    "\\epsilon": "ϵ", "\\Epsilon": "Ε",
    "\\zeta"   : "ζ", "\\Zeta"   : "Ζ",
    "\\eta"    : "η", "\\Eta"    : "Η",
    "\\theta"  : "θ", "\\Theta"  : "Θ",
    "\\iota"   : "ι", "\\Iota"   : "I",
    "\\kappa"  : "κ", "\\Kappa"  : "Κ",
    "\\lambda" : "λ", "\\Lambda" : "Λ",
    "\\mu"     : "μ", "\\Mu"     : "Μ",
    "\\nu"     : "ν", "\\Nu"     : "Ν",
    "\\xi"     : "ξ", "\\Xi"     : "Ξ",
    "\\omicron": "ο", "\\Omicron": "Ο",
    "\\pi"     : "π", "\\Pi"     : "Π",
    "\\rho"    : "ρ", "\\Rho"    : "Ρ",
    "\\sigma"  : "σ", "\\Sigma"  : "Σ",
    "\\tau"    : "τ", "\\Tau"    : "Τ",
    "\\upsilon": "υ", "\\Upsilon": "Υ",
    "\\phi"    : "ϕ", "\\Phi"    : "Φ",
    "\\chi"    : "χ", "\\Chi"    : "Χ",
    "\\psi"    : "ψ", "\\Psi"    : "Ψ",
    "\\omega"  : "ω", "\\Omega"  : "Ω",

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
    "\\iff": "⇔",
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
    "\\sharp": "♯",

    "\\ihat": "î",
    "\\jhat": "ĵ",
    // No khat :(
  },

  "commands": {
    "\\math"    : text => doReplacements(text, math_letters),
    "\\mathbb"  : text => doReplacements(text, blackboard_letters),
    "\\mathfrak": text => doReplacements(text, fraktur_letters),
    "\\mathscr" : text => doReplacements(text, script_letters),
    "\\mathcal" : text => doReplacements(text, calligraphic_letters),
    "\\textit"  : text => doReplacements(text, italic_letters),
    "\\textbf"  : text => doReplacements(text, bold_letters),
    "_"         : text => doReplacements(text, subscripts),
    "^"         : text => doReplacements(text, superscripts),
  },
});

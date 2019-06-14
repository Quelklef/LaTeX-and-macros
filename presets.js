// Many of these macros come from https://golopot.github.io/tex-to-unicode/

function doReplacements(text, dict) {
  // Apply single-letter replacements to text
  return Array.from(text).map(c => c in dict ? dict[c] : c).join('');
}

const presets = {};
function registerPreset(preset) {
  presets[preset.id] = preset;
  return preset;
}

function pairMap(s1, s2) {
  // pairMap("abc", "123") == {a: '1', b: '2', c: '3'}
  const result = {};
  for (let i = 0; i < s1.length; i++)
    result[s1[i]] = s2[i];
  return result;
}

// ==  Mappings shared between presets == //

const superscripts = pairMap(
  "0123456789+-()abcdefghijklmnoprstuvwxyz",
  "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ",
);

const subscripts = pairMap(
  "0123456789+-()aehijklmnoprstuvx",
  "₀₁₂₃₄₅₆₇₈₉⁺⁻₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ",
);

const math_letters = pairMap(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
);

const blackboard_letters = pairMap(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYzZ0123456789",
  "𝕒𝔸𝕓𝔹𝕔ℂ𝕕𝔻𝕖𝔼𝕗𝔽𝕘𝔾𝕙ℍ𝕚𝕀𝕛𝕁𝕜𝕂𝕝𝕃𝕞𝕄𝕟ℕ𝕠𝕆𝕡ℙ𝕢ℚ𝕣ℝ𝕤𝕊𝕥𝕋𝕦𝕌𝕧𝕍𝕩𝕏𝕪𝕐𝕫ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
);

const fraktur_letters = pairMap(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYzZ",
  "𝔞𝔄𝔟𝔅𝔠ℭ𝔡𝔇𝔢𝔈𝔣𝔉𝔤𝔊𝔥ℌ𝔦ℑ𝔧𝔍𝔨𝔎𝔩𝔏𝔪𝔐𝔫𝔑𝔬𝔒𝔭𝔓𝔮𝔔𝔯ℜ𝔰𝔖𝔱𝔗𝔲𝔘𝔳𝔙𝔵𝔛𝔶𝔜𝔷ℨ",
);

const script_letters = pairMap(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"
  "𝒶𝒜𝒷ℬ𝒸𝒞𝒹𝒟ℯℰ𝒻ℱℊ𝒢𝒽ℋ𝒾ℐ𝒿𝒥𝓀𝒦𝓁ℒ𝓂ℳ𝓃𝒩ℴ𝒪𝓅𝒫𝓆𝒬𝓇ℛ𝓈𝒮𝓉𝒯𝓊𝒰𝓋𝒱𝓌𝒲𝓍𝒳𝓎𝒴𝓏𝒵",
);

const calligraphic_letters = pairMap(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
  "𝓪𝓐𝓫𝓑𝓬𝓒𝓭𝓓𝓮𝓔𝓯𝓕𝓰𝓖𝓱𝓗𝓲𝓘𝓳𝓙𝓴𝓚𝓵𝓛𝓶𝓜𝓷𝓝𝓸𝓞𝓹𝓟𝓺𝓠𝓻𝓡𝓼𝓢𝓽𝓣𝓾𝓤𝓿𝓥𝔀𝓦𝔁𝓧𝔂𝓨𝔃𝓩",
);

const italic_letters = {
  // normal -> italic
  ...pairMap(
    "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "𝘢𝘈𝘣𝘉𝘤𝘊𝘥𝘋𝘦𝘌𝘧𝘍𝘨𝘎𝘩𝘏𝘪𝘐𝘫𝘑𝘬𝘒𝘭𝘓𝘮𝘔𝘯𝘕𝘰𝘖𝘱𝘗𝘲𝘘𝘳𝘙𝘴𝘚𝘵𝘛𝘶𝘜𝘷𝘝𝘸𝘞𝘹𝘟𝘺𝘠𝘻𝘡",
  ),

  // bold -> bold + italic
  ...pairMap(
    "𝗮𝗔𝗯𝗕𝗰𝗖𝗱𝗗𝗲𝗘𝗳𝗙𝗴𝗚𝗵𝗛𝗶𝗜𝗷𝗝𝗸𝗞𝗹𝗟𝗺𝗠𝗻𝗡𝗼𝗢𝗽𝗣𝗾𝗤𝗿𝗥𝘀𝗦𝘁𝗧𝘂𝗨𝘃𝗩𝘄𝗪𝘅𝗫𝘆𝗬𝘇𝗭",
    "𝙖𝘼𝙗𝘽𝙘𝘾𝙙𝘿𝙚𝙀𝙛𝙁𝙜𝙂𝙝𝙃𝙞𝙄𝙟𝙅𝙠𝙆𝙡𝙇𝙢𝙈𝙣𝙉𝙤𝙊𝙥𝙋𝙦𝙌𝙧𝙍𝙨𝙎𝙩𝙏𝙪𝙐𝙫𝙑𝙬𝙒𝙭𝙓𝙮𝙔𝙯𝙕",
  ),

  // greek -> greek + italic
  ...pairMap(
    "ΑΒΓΔΕΖΗΘIΚΛΜΝΞΟΠΡϴΣΤΥΦΧΨΩ∇αβγδϵζηθικλμνξοπρςστυϕχψω∂ϵϑϰϕϱϖ",
    "𝛢𝛣𝛤𝛥𝛦𝛧𝛨𝛩𝛪𝛫𝛬𝛭𝛮𝛯𝛰𝛱𝛲𝛳𝛴𝛵𝛶𝛷𝛸𝛹𝛺𝛻𝛼𝛽𝛾𝛿𝜀𝜁𝜂𝜃𝜄𝜅𝜆𝜇𝜈𝜉𝜊𝜋𝜌𝜍𝜎𝜏𝜐𝜑𝜒𝜓𝜔𝜕𝜖𝜗𝜘𝜙𝜚𝜛",
  ),

  // greek + bold -> greek + bold + italic
  ...pairMap(
    "𝚨𝚩𝚪𝚫𝚬𝚭𝚮𝚯𝚰𝚱𝚲𝚳𝚴𝚵𝚶𝚷𝚸𝚹𝚺𝚻𝚼𝚽𝚾𝚿𝛀𝛁𝛂𝛃𝛄𝛅𝛆𝛇𝛈𝛉𝛊𝛋𝛌𝛍𝛎𝛏𝛐𝛑𝛒𝛓𝛔𝛕𝛖𝛗𝛘𝛙𝛚𝛛𝛜𝛝𝛞𝛟𝛠𝛡",
    "𝜜𝜝𝜞𝜟𝜠𝜡𝜢𝜣𝜤𝜥𝜦𝜧𝜨𝜩𝜪𝜫𝜬𝜭𝜮𝜯𝜰𝜱𝜲𝜳𝜴𝜵𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎𝝏𝝐𝝑𝝒𝝓𝝔𝝕",
  ),
};

const bold_letters = {
  // normal -> bold
  ...pairMap(
    "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "𝗮𝗔𝗯𝗕𝗰𝗖𝗱𝗗𝗲𝗘𝗳𝗙𝗴𝗚𝗵𝗛𝗶𝗜𝗷𝗝𝗸𝗞𝗹𝗟𝗺𝗠𝗻𝗡𝗼𝗢𝗽𝗣𝗾𝗤𝗿𝗥𝘀𝗦𝘁𝗧𝘂𝗨𝘃𝗩𝘄𝗪𝘅𝗫𝘆𝗬𝘇𝗭",
  ),

  // italic -> italic + bold
  ...pairMap(
    "𝘢𝘈𝘣𝘉𝘤𝘊𝘥𝘋𝘦𝘌𝘧𝘍𝘨𝘎𝘩𝘏𝘪𝘐𝘫𝘑𝘬𝘒𝘭𝘓𝘮𝘔𝘯𝘕𝘰𝘖𝘱𝘗𝘲𝘘𝘳𝘙𝘴𝘚𝘵𝘛𝘶𝘜𝘷𝘝𝘸𝘞𝘹𝘟𝘺𝘠𝘻𝘡",
    "𝙖𝘼𝙗𝘽𝙘𝘾𝙙𝘿𝙚𝙀𝙛𝙁𝙜𝙂𝙝𝙃𝙞𝙄𝙟𝙅𝙠𝙆𝙡𝙇𝙢𝙈𝙣𝙉𝙤𝙊𝙥𝙋𝙦𝙌𝙧𝙍𝙨𝙎𝙩𝙏𝙪𝙐𝙫𝙑𝙬𝙒𝙭𝙓𝙮𝙔𝙯𝙕",
  ),

  // math -> math + bold
  ...pairMap(
    "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
  )

  // fraktur -> fraktur + bold
  ...pairMap(
    "𝔞𝔄𝔟𝔅𝔠𝕮𝔡𝔇𝔢𝔈𝔣𝔉𝔤𝔊𝔥𝕳𝔦𝕴𝔧𝔍𝔨𝔎𝔩𝔏𝔪𝔐𝔫𝔑𝔬𝔒𝔭𝔓𝔮𝔔𝔯𝕽𝔰𝔖𝔱𝔗𝔲𝔘𝔳𝔙",
    "𝖆𝕬𝖇𝕭𝖈𝕮𝖉𝕯𝖊𝕰𝖋𝕱𝖌𝕲𝖍𝕳𝖎𝕴𝖏𝕵𝖐𝕶𝖑𝕷𝖒𝕸𝖓𝕹𝖔𝕺𝖕𝕻𝖖𝕼𝖗𝕽𝖘𝕾𝖙𝕿𝖚𝖀𝖛𝖁",
  ),

  // greek -> greek + bold
  ...pairMap(
    "ΑΒΓΔΕΖΗΘIΚΛΜΝΞΟΠΡϴΣΤΥΦΧΨΩ∇αβγδϵζηθικλμνξοπρςστυϕχψω∂ϵϑϰϕϱϖ"
    "𝚨𝚩𝚪𝚫𝚬𝚭𝚮𝚯𝚰𝚱𝚲𝚳𝚴𝚵𝚶𝚷𝚸𝚹𝚺𝚻𝚼𝚽𝚾𝚿𝛀𝛁𝛂𝛃𝛄𝛅𝛆𝛇𝛈𝛉𝛊𝛋𝛌𝛍𝛎𝛏𝛐𝛑𝛒𝛓𝛔𝛕𝛖𝛗𝛘𝛙𝛚𝛛𝛜𝛝𝛞𝛟𝛠𝛡"
  )

  // greek + italic -> greek + bold + italic
  ...pairMap(
    "𝛢𝛣𝛤𝛥𝛦𝛧𝛨𝛩𝛪𝛫𝛬𝛭𝛮𝛯𝛰𝛱𝛲𝛳𝛴𝛵𝛶𝛷𝛸𝛹𝛺𝛻𝛼𝛽𝛾𝛿𝜀𝜁𝜂𝜃𝜄𝜅𝜆𝜇𝜈𝜉𝜊𝜋𝜌𝜍𝜎𝜏𝜐𝜑𝜒𝜓𝜔𝜕𝜖𝜗𝜘𝜙𝜚𝜛",
    "𝜜𝜝𝜞𝜟𝜠𝜡𝜢𝜣𝜤𝜥𝜦𝜧𝜨𝜩𝜪𝜫𝜬𝜭𝜮𝜯𝜰𝜱𝜲𝜳𝜴𝜵𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎𝝏𝝐𝝑𝝒𝝓𝝔𝝕",
  ),
};

const monospace_letters = pairMap(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789",
  "𝚊𝙰𝚋𝙱𝚌𝙲𝚍𝙳𝚎𝙴𝚏𝙵𝚐𝙶𝚑𝙷𝚒𝙸𝚓𝙹𝚔𝙺𝚕𝙻𝚖𝙼𝚗𝙽𝚘𝙾𝚙𝙿𝚚𝚀𝚛𝚁𝚜𝚂𝚝𝚃𝚞𝚄𝚟𝚅𝚠𝚆𝚡𝚇𝚢𝚈𝚣𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
);

const emoji = {
  "grin": "😀",
  "grin-2": "😃",
  "grin-3": "😄",
  "beam": "😁",
  "grin-squint": "😆",
  "grin-swear": "😅",
  "rofl": "🤣",
  "joy": "😂",
  "slight-smile": "🙂",
  "upside-down": "🙃",
  "wink": "😉",
  "smile2": "😊",
  "halo": "😇",
  "smile-hearts": "🥰",
  "love": "😍",
  "starstruck": "🤩",
  "blow-kiss": "😘",
  "kiss": "😗",
  "smile": "☺",
  "kiss-2": "😚",
  "kiss-3": "😙",
  "savor": "😋",
  "tongue": "😛",
  "wink-tongue": "😜",
  "zany": "🤪",
  "squint-tongue": "😝",
  "money-mouth": "🤑",
  "hug": "🤗",
  "face-with-hand-over-mouth": "🤭",
  "shush": "🤫",
  "thinking": "🤔",
  "zipper-mouth": "🤐",
  "face-with-raised-eyebrow": "🤨",
  "neutral": "😐",
  "expressionless": "😑",
  "blank": "😶",
  "smirk": "😏",
  "unamused": "😒",
  "eye-roll": "🙄",
  "grimace": "😬",
  "lying": "🤥",
  "relieved": "😌",
  "pensive": "😔",
  "sleepy": "😪",
  "drooling": "🤤",
  "sleeping": "😴",
  "face-with-medical-mask": "😷",
  "face-with-thermometer": "🤒",
  "face-with-head-bandage": "🤕",
  "nauseated": "🤢",
  "vomiting": "🤮",
  "sneezing": "🤧",
  "hot": "🥵",
  "cold": "🥶",
  "woozy": "🥴",
  "dizzy ": "😵",
  "exploding-head": "🤯",
  "cowboy": "🤠",
  "partying": "🥳",
  "sunglasses": "😎",
  "nerd": "🤓",
  "monocle": "🧐",
  "confused": "😕",
  "worried": "😟",
  "slightly-frowning-face": "🙁",
  "frowning": "☹",
  "face-with-open-mouth": "😮",
  "hushed": "😯",
  "astonished": "😲",
  "flushed": "😳",
  "pleading": "🥺",
  "frowning-face-with-open-mouth": "😦",
  "anguished": "😧",
  "fearful": "😨",
  "anxious-face-with-sweat": "😰",
  "sad-but-relieved-face": "😥",
  "crying": "😢",
  "loudly-crying": "😭",
  "screaming-in-fear": "😱",
  "confounded": "😖",
  "persevering": "😣",
  "disappointed": "😞",
  "downcast-face-with-sweat": "😓",
  "weary": "😩",
  "tired": "😫",
  "yawning": "🥱",
  "face-with-steam-from-nose": "😤",
  "outing": "😡",
  "angry": "😠",
  "cursing": "🤬",
  "smiling-devil": "😈",
  "angry-devil": "👿",
  "skull": "💀",
  "skull-and-crossbones": "☠",
  "poop": "💩",
  "clown": "🤡",
  "ogre": "👹",
  "goblin": "👺",
  "ghost": "👻",
  "alien": "👽",
  "alien-monster": "👾",
  "robot": "🤖",
  "grinning-cat": "😺",
  "grinning-cat-with-smiling eyes": "😸",
  "cat-with-tears-of-joy": "😹",
  "smiling-cat-with-heart-eyes": "😻",
  "cat-with-wry-smile": "😼",
  "kissing-cat": "😽",
  "weary-cat": "🙀",
  "crying-cat": "😿",
  "pouting-cat": "😾",
  "see-no-evil": "🙈",
  "hear-no-evil": "🙉",
  "speak-no-evil": "🙊",
  "kiss-mark": "💋",
  "love-letter": "💌",
  "heart-with-arrow": "💘",
  "heart-with-ribbon": "💝",
  "sparkling-heart": "💖",
  "growing-heart": "💗",
  "beating-heart": "💓",
  "revolving-hearts": "💞",
  "two-hearts": "💕",
  "heart-decoration": "💟",
  "heart-exclamation": "❣",
  "broken-heart": "💔",
  "red-heart": "❤",
  "orange-heart": "🧡",
  "yellow-heart": "💛",
  "green-heart": "💚",
  "blue-heart": "💙",
  "purple-heart": "💜",
  "brown-heart": "🤎",
  "black-heart": "🖤",
  "white-heart": "🤍",
  "100": "💯",
  "danger-symbol": "💢",
  "collision": "💥",
  "dizzy": "💫",
  "sweat-droplets": "💦",
  "dashing-away": "💨",
  "hole": "🕳",
  "bomb": "💣",
  "speech-balloon": "💬",
  "eye-in-speech-bubble": "👁",
  "left-speech-bubble": "🗨",
  "right-anger-bubble": "🗯",
  "thought-balloon": "💭",
  "zzz": "💤",
};




/*

Presets should have the following attributes:
- name: pretty name e.g. to be seen by users
- id: arbitrary unique string that should not change version-to-version
- replacements: object of replacmeents
- commands: object of commands

*/

// == General Symbol Preset == //

const preset_general = registerPreset({
  "name": "General Symbols",
  "id": "general",
  "replacements": {
    "--": "—",
    "->": "→",
    "<-": "←",
  },
  "commands": {
    "\\italic": text => doReplacements(text, italic_letters),
    "\\bold"  : text => doReplacements(text, bold_letters),
    "\\mono"  : text => doReplacements(text, monospace_letters),
    "\\script": text => doReplacements(text, script_letters),
  },
});


// == Sub- and Super-script Preset == //

const preset_sub_super = registerPreset({
  "name": "Sub- & Super- Scripts",
  "id": "sub super scripts",
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
  "id": "latex math",
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
    "\\texttt"  : text => doReplacements(text, monospace_letters),
    "_"         : text => doReplacements(text, subscripts),
    "^"         : text => doReplacements(text, superscripts),
  },
});


// == Emoji Preset == //

const emoji_replacements = {};
for (const em in emoji)
  emoji_replacements[":" + em + ":"] = emoji[em];

const preset_emoji = registerPreset({
  "name": "Emoji",
  "id": "emoji",
  "replacements": emoji_replacements,
  "commands": {},
});

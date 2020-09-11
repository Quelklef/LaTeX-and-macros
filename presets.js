// Many replacements from https://golopot.github.io/tex-to-unicode/
// Many replacements from Wikipedia

function doReplacements(text, dict) {
  // Apply single-letter replacements to text
  return Array.from(text).map(c => c in dict ? dict[c] : c).join('');
}

function pairs(s1, s2) {
  // pairs("abc", "123") == {a: '1', b: '2', c: '3'}

  // Hndle unicode properly by splitting into lists of unicode chars
  s1_ = [...s1];
  s2_ = [...s2];

  const result = {};
  for (let i = 0; i < s1_.length; i++)
    result[s1_[i]] = s2_[i];
  return result;
}

// ==  Mappings shared between presets == //

const superscripts = pairs(
  "0123456789+-()abcdefghijklmnoprstuvwxyz",
  "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ",
);

const subscripts = pairs(
  "0123456789+-()aehijklmnoprstuvx",
  "₀₁₂₃₄₅₆₇₈₉⁺⁻₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ",
);

const mathFont = pairs(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
);

const blackboardFont = pairs(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYzZ0123456789",
  "𝕒𝔸𝕓𝔹𝕔ℂ𝕕𝔻𝕖𝔼𝕗𝔽𝕘𝔾𝕙ℍ𝕚𝕀𝕛𝕁𝕜𝕂𝕝𝕃𝕞𝕄𝕟ℕ𝕠𝕆𝕡ℙ𝕢ℚ𝕣ℝ𝕤𝕊𝕥𝕋𝕦𝕌𝕧𝕍𝕩𝕏𝕪𝕐𝕫ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
);

const frakturFont = pairs(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXyYzZ",
  "𝔞𝔄𝔟𝔅𝔠ℭ𝔡𝔇𝔢𝔈𝔣𝔉𝔤𝔊𝔥ℌ𝔦ℑ𝔧𝔍𝔨𝔎𝔩𝔏𝔪𝔐𝔫𝔑𝔬𝔒𝔭𝔓𝔮𝔔𝔯ℜ𝔰𝔖𝔱𝔗𝔲𝔘𝔳𝔙𝔵𝔛𝔶𝔜𝔷ℨ",
);

const scriptFont = pairs(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
  "𝒶𝒜𝒷ℬ𝒸𝒞𝒹𝒟ℯℰ𝒻ℱℊ𝒢𝒽ℋ𝒾ℐ𝒿𝒥𝓀𝒦𝓁ℒ𝓂ℳ𝓃𝒩ℴ𝒪𝓅𝒫𝓆𝒬𝓇ℛ𝓈𝒮𝓉𝒯𝓊𝒰𝓋𝒱𝓌𝒲𝓍𝒳𝓎𝒴𝓏𝒵",
);

const calligraphicFont = pairs(
  "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
  "𝓪𝓐𝓫𝓑𝓬𝓒𝓭𝓓𝓮𝓔𝓯𝓕𝓰𝓖𝓱𝓗𝓲𝓘𝓳𝓙𝓴𝓚𝓵𝓛𝓶𝓜𝓷𝓝𝓸𝓞𝓹𝓟𝓺𝓠𝓻𝓡𝓼𝓢𝓽𝓣𝓾𝓤𝓿𝓥𝔀𝓦𝔁𝓧𝔂𝓨𝔃𝓩",
);

const italicFont = {
  // normal -> italic
  ...pairs(
    "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "𝘢𝘈𝘣𝘉𝘤𝘊𝘥𝘋𝘦𝘌𝘧𝘍𝘨𝘎𝘩𝘏𝘪𝘐𝘫𝘑𝘬𝘒𝘭𝘓𝘮𝘔𝘯𝘕𝘰𝘖𝘱𝘗𝘲𝘘𝘳𝘙𝘴𝘚𝘵𝘛𝘶𝘜𝘷𝘝𝘸𝘞𝘹𝘟𝘺𝘠𝘻𝘡",
  ),

  // bold -> bold + italic
  ...pairs(
    "𝗮𝗔𝗯𝗕𝗰𝗖𝗱𝗗𝗲𝗘𝗳𝗙𝗴𝗚𝗵𝗛𝗶𝗜𝗷𝗝𝗸𝗞𝗹𝗟𝗺𝗠𝗻𝗡𝗼𝗢𝗽𝗣𝗾𝗤𝗿𝗥𝘀𝗦𝘁𝗧𝘂𝗨𝘃𝗩𝘄𝗪𝘅𝗫𝘆𝗬𝘇𝗭",
    "𝙖𝘼𝙗𝘽𝙘𝘾𝙙𝘿𝙚𝙀𝙛𝙁𝙜𝙂𝙝𝙃𝙞𝙄𝙟𝙅𝙠𝙆𝙡𝙇𝙢𝙈𝙣𝙉𝙤𝙊𝙥𝙋𝙦𝙌𝙧𝙍𝙨𝙎𝙩𝙏𝙪𝙐𝙫𝙑𝙬𝙒𝙭𝙓𝙮𝙔𝙯𝙕",
  ),

  // greek -> greek + italic
  ...pairs(
    "ΑΒΓΔΕΖΗΘIΚΛΜΝΞΟΠΡϴΣΤΥΦΧΨΩ∇αβγδϵζηθικλμνξοπρςστυϕχψω∂ϵϑϰϕϱϖ",
    "𝛢𝛣𝛤𝛥𝛦𝛧𝛨𝛩𝛪𝛫𝛬𝛭𝛮𝛯𝛰𝛱𝛲𝛳𝛴𝛵𝛶𝛷𝛸𝛹𝛺𝛻𝛼𝛽𝛾𝛿𝜀𝜁𝜂𝜃𝜄𝜅𝜆𝜇𝜈𝜉𝜊𝜋𝜌𝜍𝜎𝜏𝜐𝜑𝜒𝜓𝜔𝜕𝜖𝜗𝜘𝜙𝜚𝜛",
  ),

  // greek + bold -> greek + bold + italic
  ...pairs(
    "𝚨𝚩𝚪𝚫𝚬𝚭𝚮𝚯𝚰𝚱𝚲𝚳𝚴𝚵𝚶𝚷𝚸𝚹𝚺𝚻𝚼𝚽𝚾𝚿𝛀𝛁𝛂𝛃𝛄𝛅𝛆𝛇𝛈𝛉𝛊𝛋𝛌𝛍𝛎𝛏𝛐𝛑𝛒𝛓𝛔𝛕𝛖𝛗𝛘𝛙𝛚𝛛𝛜𝛝𝛞𝛟𝛠𝛡",
    "𝜜𝜝𝜞𝜟𝜠𝜡𝜢𝜣𝜤𝜥𝜦𝜧𝜨𝜩𝜪𝜫𝜬𝜭𝜮𝜯𝜰𝜱𝜲𝜳𝜴𝜵𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎𝝏𝝐𝝑𝝒𝝓𝝔𝝕",
  ),
};

const boldFont = {
  // normal -> bold
  ...pairs(
    "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    "𝗮𝗔𝗯𝗕𝗰𝗖𝗱𝗗𝗲𝗘𝗳𝗙𝗴𝗚𝗵𝗛𝗶𝗜𝗷𝗝𝗸𝗞𝗹𝗟𝗺𝗠𝗻𝗡𝗼𝗢𝗽𝗣𝗾𝗤𝗿𝗥𝘀𝗦𝘁𝗧𝘂𝗨𝘃𝗩𝘄𝗪𝘅𝗫𝘆𝗬𝘇𝗭",
  ),

  // italic -> italic + bold
  ...pairs(
    "𝘢𝘈𝘣𝘉𝘤𝘊𝘥𝘋𝘦𝘌𝘧𝘍𝘨𝘎𝘩𝘏𝘪𝘐𝘫𝘑𝘬𝘒𝘭𝘓𝘮𝘔𝘯𝘕𝘰𝘖𝘱𝘗𝘲𝘘𝘳𝘙𝘴𝘚𝘵𝘛𝘶𝘜𝘷𝘝𝘸𝘞𝘹𝘟𝘺𝘠𝘻𝘡",
    "𝙖𝘼𝙗𝘽𝙘𝘾𝙙𝘿𝙚𝙀𝙛𝙁𝙜𝙂𝙝𝙃𝙞𝙄𝙟𝙅𝙠𝙆𝙡𝙇𝙢𝙈𝙣𝙉𝙤𝙊𝙥𝙋𝙦𝙌𝙧𝙍𝙨𝙎𝙩𝙏𝙪𝙐𝙫𝙑𝙬𝙒𝙭𝙓𝙮𝙔𝙯𝙕",
  ),

  // math -> math + bold
  ...pairs(
    "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
  ),

  // fraktur -> fraktur + bold
  ...pairs(
    "𝔞𝔄𝔟𝔅𝔠𝕮𝔡𝔇𝔢𝔈𝔣𝔉𝔤𝔊𝔥𝕳𝔦𝕴𝔧𝔍𝔨𝔎𝔩𝔏𝔪𝔐𝔫𝔑𝔬𝔒𝔭𝔓𝔮𝔔𝔯𝕽𝔰𝔖𝔱𝔗𝔲𝔘𝔳𝔙",
    "𝖆𝕬𝖇𝕭𝖈𝕮𝖉𝕯𝖊𝕰𝖋𝕱𝖌𝕲𝖍𝕳𝖎𝕴𝖏𝕵𝖐𝕶𝖑𝕷𝖒𝕸𝖓𝕹𝖔𝕺𝖕𝕻𝖖𝕼𝖗𝕽𝖘𝕾𝖙𝕿𝖚𝖀𝖛𝖁",
  ),

  // greek -> greek + bold
  ...pairs(
    "ΑΒΓΔΕΖΗΘIΚΛΜΝΞΟΠΡϴΣΤΥΦΧΨΩ∇αβγδϵζηθικλμνξοπρςστυϕχψω∂ϵϑϰϕϱϖ",
    "𝚨𝚩𝚪𝚫𝚬𝚭𝚮𝚯𝚰𝚱𝚲𝚳𝚴𝚵𝚶𝚷𝚸𝚹𝚺𝚻𝚼𝚽𝚾𝚿𝛀𝛁𝛂𝛃𝛄𝛅𝛆𝛇𝛈𝛉𝛊𝛋𝛌𝛍𝛎𝛏𝛐𝛑𝛒𝛓𝛔𝛕𝛖𝛗𝛘𝛙𝛚𝛛𝛜𝛝𝛞𝛟𝛠𝛡",
  ),

  // greek + italic -> greek + bold + italic
  ...pairs(
    "𝛢𝛣𝛤𝛥𝛦𝛧𝛨𝛩𝛪𝛫𝛬𝛭𝛮𝛯𝛰𝛱𝛲𝛳𝛴𝛵𝛶𝛷𝛸𝛹𝛺𝛻𝛼𝛽𝛾𝛿𝜀𝜁𝜂𝜃𝜄𝜅𝜆𝜇𝜈𝜉𝜊𝜋𝜌𝜍𝜎𝜏𝜐𝜑𝜒𝜓𝜔𝜕𝜖𝜗𝜘𝜙𝜚𝜛",
    "𝜜𝜝𝜞𝜟𝜠𝜡𝜢𝜣𝜤𝜥𝜦𝜧𝜨𝜩𝜪𝜫𝜬𝜭𝜮𝜯𝜰𝜱𝜲𝜳𝜴𝜵𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎𝝏𝝐𝝑𝝒𝝓𝝔𝝕",
  ),
};

const monospaceFont = pairs(
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




// == General Symbol Preset == //

const presets = {};
function registerPreset(preset) {
  presets[preset.id] = preset;
  return preset;
}

registerPreset({
  "name": "General Symbols",
  "id": "general",
  "macros": [
    macro('simple', "--"  , "—"),
    macro('simple', "->"  , "→"),
    macro('simple', "<-"  , "←"),
    macro('simple', "=>"  , "⇒"),
    macro('simple', "<="  , "⇐"),
    macro('simple', "<=>" , "⇔"),
    macro('simple', "</=>", "⇎"),
    macro('simple', "<==" , "⟸"),
    macro('simple', "==>" , "⟹"),
    macro('simple', "<==>", "⟺"),
    macro('simple', "=/>" , "⇏"),
    macro('simple', "</=" , "⇍"),
    macro('simple', "<->" , "⭤"),
    macro('simple', "-/>" , "↛"),
    macro('simple', "</-" , "↚"),
    macro('simple', "<--" , "⟵"),
    macro('simple', "-->" , "⟶"),
    macro('simple', "<-->", "⟷"),
    macro('curly', "\\italic", text => doReplacements(text, italicFont)),
    macro('curly', "\\bold"  , text => doReplacements(text, boldFont)),
    macro('curly', "\\mono"  , text => doReplacements(text, monospaceFont)),
    macro('curly', "\\script", text => doReplacements(text, scriptFont)),
  ],
});


// == Sub- and Super-script Preset == //

{

const macros = [];

for (const [char, replacement] of Object.entries(subscripts))
  macros.push(macro('simple', "_" + char, replacement));
for (const [char, replacement] of Object.entries(superscripts))
  macros.push(macro('simple', '^' + char, replacement));

registerPreset({
  name: "Sub- & Super- Scripts",
  id: "sub super scripts",
  macros: macros,
});

}

// == LaTeX Preset == //

{

registerPreset({
  name: "LaTeX",
  id: "latex",
  macros: [

    macro('simple', "\\alpha"  , "α"), macro('simple', "\\Alpha"  , "Α"),
    macro('simple', "\\beta"   , "β"), macro('simple', "\\Beta"   , "Β"),
    macro('simple', "\\gamma"  , "γ"), macro('simple', "\\Gamma"  , "Γ"),
    macro('simple', "\\delta"  , "δ"), macro('simple', "\\Delta"  , "Δ"),
    macro('simple', "\\epsilon", "ϵ"), macro('simple', "\\Epsilon", "Ε"),
    macro('simple', "\\zeta"   , "ζ"), macro('simple', "\\Zeta"   , "Ζ"),
    macro('simple', "\\eta"    , "η"), macro('simple', "\\Eta"    , "Η"),
    macro('simple', "\\theta"  , "θ"), macro('simple', "\\Theta"  , "Θ"),
    macro('simple', "\\iota"   , "ι"), macro('simple', "\\Iota"   , "I"),
    macro('simple', "\\kappa"  , "κ"), macro('simple', "\\Kappa"  , "Κ"),
    macro('simple', "\\lambda" , "λ"), macro('simple', "\\Lambda" , "Λ"),
    macro('simple', "\\mu"     , "μ"), macro('simple', "\\Mu"     , "Μ"),
    macro('simple', "\\nu"     , "ν"), macro('simple', "\\Nu"     , "Ν"),
    macro('simple', "\\xi"     , "ξ"), macro('simple', "\\Xi"     , "Ξ"),
    macro('simple', "\\omicron", "ο"), macro('simple', "\\Omicron", "Ο"),
    macro('simple', "\\pi"     , "π"), macro('simple', "\\Pi"     , "Π"),
    macro('simple', "\\rho"    , "ρ"), macro('simple', "\\Rho"    , "Ρ"),
    macro('simple', "\\sigma"  , "σ"), macro('simple', "\\Sigma"  , "Σ"),
    macro('simple', "\\tau"    , "τ"), macro('simple', "\\Tau"    , "Τ"),
    macro('simple', "\\upsilon", "υ"), macro('simple', "\\Upsilon", "Υ"),
    macro('simple', "\\phi"    , "ϕ"), macro('simple', "\\Phi"    , "Φ"),
    macro('simple', "\\chi"    , "χ"), macro('simple', "\\Chi"    , "Χ"),
    macro('simple', "\\psi"    , "ψ"), macro('simple', "\\Psi"    , "Ψ"),
    macro('simple', "\\omega"  , "ω"), macro('simple', "\\Omega"  , "Ω"),

    macro('simple', "\\varepsilon", "ε"),
    macro('simple', "\\varkappa", "ϰ"),
    macro('simple', "\\varphi", "φ"),
    macro('simple', "\\varpi", "ϖ"),
    macro('simple', "\\varrho", "ϱ"),
    macro('simple', "\\varsigma", "ς"),
    macro('simple', "\\vartheta", "ϑ"),
    macro('simple', "\\neq", "≠"),
    macro('simple', "\\equiv", "≡"),
    macro('simple', "\\not\\equiv", "≢"),
    macro('simple', "\\leq", "≤"),
    macro('simple', "\\geq", "≥"),
    macro('simple', "\\leqq", "≦"),
    macro('simple', "\\geqq", "≧"),
    macro('simple', "\\lneqq", "≨"),
    macro('simple', "\\gneqq", "≩"),
    macro('simple', "\\leqslant", "⩽"),
    macro('simple', "\\geqslant", "⩾"),
    macro('simple', "\\ll", "≪"),
    macro('simple', "\\gg", "≫"),
    macro('simple', "\\nless", "≮"),
    macro('simple', "\\ngtr", "≯"),
    macro('simple', "\\nleq", "≰"),
    macro('simple', "\\ngeq", "≱"),
    macro('simple', "\\lessequivlnt", "≲"),
    macro('simple', "\\greaterequivlnt", "≳"),
    macro('simple', "\\prec", "≺"),
    macro('simple', "\\succ", "≻"),
    macro('simple', "\\preccurlyeq", "≼"),
    macro('simple', "\\succcurlyeq", "≽"),
    macro('simple', "\\precapprox", "≾"),
    macro('simple', "\\succapprox", "≿"),
    macro('simple', "\\nprec", "⊀"),
    macro('simple', "\\nsucc", "⊁"),
    macro('simple', "\\sim", "∼"),
    macro('simple', "\\not\\sim", "≁"),
    macro('simple', "\\simeq", "≃"),
    macro('simple', "\\not\\simeq", "≄"),
    macro('simple', "\\backsim", "∽"),
    macro('simple', "\\lazysinv", "∾"),
    macro('simple', "\\wr", "≀"),
    macro('simple', "\\cong", "≅"),
    macro('simple', "\\not\\cong", "≇"),
    macro('simple', "\\approx", "≈"),
    macro('simple', "\\not\\approx", "≉"),
    macro('simple', "\\approxeq", "≊"),
    macro('simple', "\\approxnotequal", "≆"),
    macro('simple', "\\tildetrpl", "≋"),
    macro('simple', "\\allequal", "≌"),
    macro('simple', "\\asymp", "≍"),
    macro('simple', "\\doteq", "≐"),
    macro('simple', "\\doteqdot", "≑"),
    macro('simple', "\\lneq", "⪇"),
    macro('simple', "\\gneq", "⪈"),
    macro('simple', "\\preceq", "⪯"),
    macro('simple', "\\succeq", "⪰"),
    macro('simple', "\\precneqq", "⪵"),
    macro('simple', "\\succneqq", "⪶"),
    macro('simple', "\\emptyset", "∅"),
    macro('simple', "\\in", "∈"),
    macro('simple', "\\notin", "∉"),
    macro('simple', "\\not\\in", "∉"),
    macro('simple', "\\ni", "∋"),
    macro('simple', "\\not\\ni", "∌"),
    macro('simple', "\\subset", "⊂"),
    macro('simple', "\\subseteq", "⊆"),
    macro('simple', "\\not\\subset", "⊄"),
    macro('simple', "\\not\\subseteq", "⊈"),
    macro('simple', "\\supset", "⊃"),
    macro('simple', "\\supseteq", "⊇"),
    macro('simple', "\\not\\supset", "⊅"),
    macro('simple', "\\not\\supseteq", "⊉"),
    macro('simple', "\\subsetneq", "⊊"),
    macro('simple', "\\supsetneq", "⊋"),
    macro('simple', "\\exists", "∃"),
    macro('simple', "\\nexists", "∄"),
    macro('simple', "\\not\\exists", "∄"),
    macro('simple', "\\forall", "∀"),
    macro('simple', "\\aleph", "ℵ"),
    macro('simple', "\\beth", "ℶ"),
    macro('simple', "\\neg", "¬"),
    macro('simple', "\\wedge", "∧"),
    macro('simple', "\\vee", "∨"),
    macro('simple', "\\veebar", "⊻"),
    macro('simple', "\\land", "∧"),
    macro('simple', "\\lor", "∨"),
    macro('simple', "\\top", "⊤"),
    macro('simple', "\\bot", "⊥"),
    macro('simple', "\\cup", "∪"),
    macro('simple', "\\cap", "∩"),
    macro('simple', "\\bigcup", "⋃"),
    macro('simple', "\\bigcap", "⋂"),
    macro('simple', "\\setminus", "∖"),
    macro('simple', "\\therefore", "∴"),
    macro('simple', "\\because", "∵"),
    macro('simple', "\\Box", "□"),
    macro('simple', "\\models", "⊨"),
    macro('simple', "\\vdash", "⊢"),
    macro('simple', "\\rightarrow", "→"),
    macro('simple', "\\Rightarrow", "⇒"),
    macro('simple', "\\implies", "⇒"),
    macro('simple', "\\leftarrow", "←"),
    macro('simple', "\\Leftarrow", "⇐"),
    macro('simple', "\\uparrow", "↑"),
    macro('simple', "\\Uparrow", "⇑"),
    macro('simple', "\\downarrow", "↓"),
    macro('simple', "\\Downarrow", "⇓"),
    macro('simple', "\\nwarrow", "↖"),
    macro('simple', "\\nearrow", "↗"),
    macro('simple', "\\searrow", "↘"),
    macro('simple', "\\swarrow", "↙"),
    macro('simple', "\\mapsto", "↦"),
    macro('simple', "\\to", "→"),
    macro('simple', "\\leftrightarrow", "↔"),
    macro('simple', "\\hookleftarrow", "↩"),
    macro('simple', "\\Leftrightarrow", "⇔"),
    macro('simple', "\\iff", "⇔"),
    macro('simple', "\\rightarrowtail", "↣"),
    macro('simple', "\\leftarrowtail", "↢"),
    macro('simple', "\\twoheadrightarrow", "↠"),
    macro('simple', "\\twoheadleftarrow", "↞"),
    macro('simple', "\\hookrightarrow", "↪"),
    macro('simple', "\\hookleftarrow", "↩"),
    macro('simple', "\\rightsquigarrow", "⇝"),
    macro('simple', "\\rightleftharpoons", "⇌"),
    macro('simple', "\\leftrightharpoons", "⇋"),
    macro('simple', "\\rightharpoonup", "⇀"),
    macro('simple', "\\rightharpoondown", "⇁"),
    macro('simple', "\\times", "×"),
    macro('simple', "\\div", "÷"),
    macro('simple', "\\infty", "∞"),
    macro('simple', "\\nabla", "∇"),
    macro('simple', "\\partial", "∂"),
    macro('simple', "\\sum", "∑"),
    macro('simple', "\\prod", "∏"),
    macro('simple', "\\coprod", "∐"),
    macro('simple', "\\int", "∫"),
    macro('simple', "\\iint", "∬"),
    macro('simple', "\\iiint", "∭"),
    macro('simple', "\\iiiint", "⨌"),
    macro('simple', "\\oint", "∮"),
    macro('simple', "\\surfintegral", "∯"),
    macro('simple', "\\volintegral", "∰"),
    macro('simple', "\\Re", "ℜ"),
    macro('simple', "\\Im", "ℑ"),
    macro('simple', "\\wp", "℘"),
    macro('simple', "\\mp", "∓"),
    macro('simple', "\\langle", "⟨"),
    macro('simple', "\\rangle", "⟩"),
    macro('simple', "\\lfloor", "⌊"),
    macro('simple', "\\rfloor", "⌋"),
    macro('simple', "\\lceil", "⌈"),
    macro('simple', "\\rceil", "⌉"),
    macro('simple', "\\pm", "±"),
    macro('simple', "\\mp", "∓"),
    macro('simple', "\\dotplus", "∔"),
    macro('simple', "\\bullet", "∙"),
    macro('simple', "\\cdot", "⋅"),
    macro('simple', "\\oplus", "⊕"),
    macro('simple', "\\ominus", "⊖"),
    macro('simple', "\\otimes", "⊗"),
    macro('simple', "\\oslash", "⊘"),
    macro('simple', "\\odot", "⊙"),
    macro('simple', "\\circ", "∘"),
    macro('simple', "^\\circ", "°"),
    macro('simple', "\\surd", "√"),
    macro('simple', "\\propto", "∝"),
    macro('simple', "\\angle", "∠"),
    macro('simple', "\\measuredangle", "∡"),
    macro('simple', "\\sphericalangle", "∢"),
    macro('simple', "\\mid", "∣"),
    macro('simple', "\\nmid", "∤"),
    macro('simple', "\\not\\mid", "∤"),
    macro('simple', "\\parallel", "∥"),
    macro('simple', "\\nparallel", "∦"),
    macro('simple', "\\not\\parallel", "∦"),
    macro('simple', "\\flat", "♭"),
    macro('simple', "\\natural", "♮"),
    macro('simple', "\\sharp", "♯"),

    macro('simple', "\\ihat", "î"),
    macro('simple', "\\jhat", "ĵ"),
    // No khat :(

    macro('curly', "\\math"    , text => doReplacements(text, mathFont)),
    macro('curly', "\\mathbb"  , text => doReplacements(text, blackboardFont)),
    macro('curly', "\\mathfrak", text => doReplacements(text, frakturFont)),
    macro('curly', "\\mathscr" , text => doReplacements(text, scriptFont)),
    macro('curly', "\\mathcal" , text => doReplacements(text, calligraphicFont)),
    macro('curly', "\\textit"  , text => doReplacements(text, italicFont)),
    macro('curly', "\\textbf"  , text => doReplacements(text, boldFont)),
    macro('curly', "\\texttt"  , text => doReplacements(text, monospaceFont)),
    macro('curly', "_"         , text => doReplacements(text, subscripts)),
    macro('curly', "^"         , text => doReplacements(text, superscripts)),
  ],
});

}


{

const charMacros = [];
for (const [char, replacement] of Object.entries(mathFont))
  charMacros.push(macro('simple', '\\' + char, replacement));

registerPreset({
  name: 'Other Math',
  id: 'math',

  macros: [
    
    ...charMacros,

    macro('simple', '\\bbR', 'ℝ'),
    macro('simple', '\\bbQ', 'ℚ'),
    macro('simple', '\\bbN', 'ℕ'),
    macro('simple', '\\bbZ', 'ℤ'),
    macro('simple', '\\bbC', 'ℂ'),
    macro('simple', '\\bbH', 'ℍ'),
    macro('simple', '\\bbP', 'ℙ'),
    
  ],
});

}


// == Emoji Preset == //

{

const macros = [];
for (const [text, char] of Object.entries(emoji))
  macros.push(macro('simple', ':' + text + ':', char));

registerPreset({
  name: "Emoji",
  id: "emoji",
  macros: macros,
});

}


function macro(kind, name, arg) {
  switch (kind) {

    // macro('simple', A, B) gives a macro that replaces A with B
    case 'simple': {
      const replacement = arg;
      return {
        name: name,
        example: { in: name, out: replacement },
        run(text) {
          while (text.includes(name))
            text = text.replace(name, replacement);
          return text;
        },
      };
    }

    // macro('curly', 'T', func) gives a macro that replaces 'T{text}' with func('text')
    case 'curly': {
      const func = arg;
      return {
        name: name,
        example: { in: `${name}{abc ABC 123 !@#}`, out: func('abc ABC 123 !@#') },
        run(text, { nameStart, nameEnd }) {
          if (text[nameEnd + 1] !== '{') return;
          const argStart = nameEnd + 2;
          if (!text.slice(argStart).includes('}')) return;
          const argEnd = text.indexOf('}', argStart) - 1;
          const arg = text.slice(argStart, argEnd + 1);
          console.log('arg=', arg);
          return text.slice(0, nameStart) + func(arg) + text.slice(argEnd + '}'.length + 1);
        },
      }
    }

  }
}

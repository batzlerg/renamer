const JS_TRANSFORMS = {
  'remove': (base, input) => {
    let i = base.indexOf(input);
    if (i < 0) {
      return base;
    }
    return [
      base.slice(0, i),
      base.slice(i + input.length, base.length)
    ].reduce((acc, curr) => acc + curr);
  },
  'remove all': (base, input) => {
    let temp = base;
    while (temp !== JS_TRANSFORMS['remove'](temp, input)) {
      temp = JS_TRANSFORMS['remove'](temp, input);
    }
    return temp;
  },
  'replace': (base, input, insert) => {
    let i = base.indexOf(input);
    if (i < 0) { return base; }
    return [
      base.slice(0, i),
      insert,
      base.slice(i + input.length, base.length)
    ].reduce((acc, curr) => acc + curr);
  },
  'add before': (base, input, insert) => {
    let i = base.indexOf(input);
    if (i < 0) { return base; }
    return [
      base.slice(0, i),
      insert,
      base.slice(i, base.length)
    ].reduce((acc, curr) => acc + curr);
  },
  'add after': (base, input, insert) => {
    let i = base.indexOf(input);
    if (i < 0) { return base; }
    return [
      base.slice(0, i + input.length),
      insert,
      base.slice(i + input.length, base.length)
    ].reduce((acc, curr) => acc + curr);
  }
};

const BASH_TRANSFORMS = {
  'remove': input => ({
    util: 'awk',
    command: `sub(\"${input}\",\"\");`
  }),
  'remove all': input => ({
    util: 'awk',
    command: `gsub(\"${input}\",\"\");`
  }),
  'replace': (input, insert) => ({
    util: 'awk',
    command: `sub(\"${input}\",\"${insert}\");`
  }),
  'add before': (input, insert) => ({
    util: 'awk',
    command: `sub(\"${input}\",\"${insert}${input}\");`
  }),
  'add after': (input, insert) => ({
    util: 'awk',
    command: `sub(\"${input}\",\"${input}${insert}\");`
  }),
};

export default {
  TRANSFORM_TYPES: [
    'remove',
    'remove all',
    'replace',
    'add before',
    'add after'
  ],
  INSERT_TRANSFORMS: [
    'replace',
    'add before',
    'add after'
  ],
  JS_TRANSFORMS,
  BASH_TRANSFORMS
}

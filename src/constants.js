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
}

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
  JS_TRANSFORMS
}

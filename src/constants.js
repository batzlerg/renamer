const JS_TRANSFORMS = {
  'remove': (base, input) => {
    return base.replace(input, '');
  },
  'remove all': (base, input) => {
    return base.replace(new RegExp(input, 'g'), '');
  },
  'replace': (base, input, insert) => {
    return base.replace(input, insert);
  },
  'replace all': (base, input, insert) => {
    return base.replace(new RegExp(input, 'g'), insert);
  },
  'add before': (base, input, insert) => {
    return base.replace(input, `${insert}${input}`);
  },
  'add after': (base, input, insert) => {
    return base.replace(input, `${input}${insert}`);
  }
};

const BASH_TRANSFORMS = {
  'remove': input => {
    return `sub("${input}","");`
  },
  'remove all': input => {
    return `gsub("${input}","");`
  },
  'replace': (input, insert) => {
    return `sub("${input}","${insert}");`
  },
  'replace all': (input, insert) => {
    return `gsub("${input}","${insert}");`
  },
  'add before': (input, insert) => {
    return `sub("${input}","${insert}${input}");`
  },
  'add after': (input, insert) => {
    return `sub("${input}","${input}${insert}");`
  },
};

export default {
  TRANSFORM_TYPES: [
    'remove',
    'remove all',
    'replace',
    'replace all',
    'add before',
    'add after'
  ],
  INSERT_TRANSFORMS: [
    'replace',
    'replace all',
    'add before',
    'add after'
  ],
  JS_TRANSFORMS,
  BASH_TRANSFORMS
}

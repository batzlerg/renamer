const APP_TITLE = "renamer";

const JS_TRANSFORMS = {
  'remove': (base, input) => base.replace(input, ''),
  'remove all': (base, input) => base.replace(new RegExp(input, 'g'), ''),
  'replace': (base, input, insert) => base.replace(input, insert),
  'replace all': (base, input, insert) => base.replace(new RegExp(input, 'g'), insert),
  'add before': (base, input, insert) => base.replace(input, `${insert}${input}`),
  'add after': (base, input, insert) => base.replace(input, `${input}${insert}`)
};

const BASH_TRANSFORMS = {
  'remove': input => `sub("${input}","");`,
  'remove all': input => `gsub("${input}","");`,
  'replace': (input, insert) => `sub("${input}","${insert}");`,
  'replace all': (input, insert) => `gsub("${input}","${insert}");`,
  'add before': (input, insert) => `sub("${input}","${insert}${input}");`,
  'add after': (input, insert) => `sub("${input}","${input}${insert}");`
};

const POWERSHELL_TRANSFORMS = {
  'remove': input => `-replace '(.*?)${input}(.*)', '$1$2'`,
  'remove all': input => `-replace '${input}', ''`,
  'replace': (input, insert) => `-replace '(.*?)${input}(.*)', '$1${insert}$2'`,
  'replace all': (input, insert) => `-replace '${input}', '${insert}'`,
  'add before': (input, insert) => `-replace '(.*?)${input}(.*)', '$1${insert}${input}$2'`,
  'add after': (input, insert) => `-replace '(.*?)${input}(.*)', '$1${input}${insert}$2'`
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
  BASH_TRANSFORMS,
  POWERSHELL_TRANSFORMS,
  APP_TITLE
};

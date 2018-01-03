http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // add your custom rules here
  'rules': {
    "eqeqeq": 0,
    "no-new": 0,
    "semi": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "indent": 0,
    'no-labels': ["error", { "allowLoop": true }],
    'new-cap': 0,
  }
}

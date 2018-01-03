module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eqeqeq': 0,
    'no-new': 0,
    'semi': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent': 0,
    'no-labels': ["error", { "allowLoop": true }]
  },
  'env': {
    'browser': true
  }
}

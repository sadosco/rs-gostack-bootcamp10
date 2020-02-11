module.exports = {
  env: {
    es6: true,
    node: true,
  },
  prettier/prettier: "error",
  extends: [ 'airbnb-base', 'prettier'],
  plugins: 'prettier',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassing": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
};

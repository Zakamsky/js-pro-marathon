module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "object-curly-newline": ["error", { "multiline": true, "minProperties": 10 }],
    "max-len": ["error", { "code": 130 }],
    "no-plusplus": "off",
    "no-bitwise": "warn",
    "no-param-reassign": "warn",
    "no-return-assign": "warn",
  },
};

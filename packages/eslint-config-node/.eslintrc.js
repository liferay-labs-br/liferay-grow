module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort', 'sort-destructure-keys', 'sort-keys-fix'],
  rules: {
    'semi': ["error", "always"],
    "simple-import-sort/sort": "error",
    "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": false, "minKeys": 2 }],
    "sort-destructure-keys/sort-destructure-keys": [2, { "caseSensitive": false }],
    "sort-keys-fix/sort-keys-fix": "warn",
    "no-explicit-any": "off",
    "camelcase": "off",
    "react/display-name": "off"
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect',
    },
  }
}

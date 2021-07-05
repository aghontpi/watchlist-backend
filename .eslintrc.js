module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    souceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'max-len': ['error', 120],
    'no-nested-ternary': 2,
    camelcase: 2,
    'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    'import/extensions': ['error', 'never', { svg: 'always', middleware:"always" }],
    'import/no-named-as-default-member': 2,
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
    'import/no-cycle': 2,
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/no-cycle': 0,
    'import/no-unused-modules': 0,
    'import/no-anonymous-default-export': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};

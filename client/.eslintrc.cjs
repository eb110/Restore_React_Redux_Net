/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname, // added
  },
  plugins: ['react-refresh', "require-explicit-generics"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    "@typescript-eslint/explicit-function-return-type": "off",
    "require-explicit-generics/require-explicit-generics": [
      "error",
      // List your functions here
      [ "useState" ],
    ]
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "error"
      },
    }
  ]
}

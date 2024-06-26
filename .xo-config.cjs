/** @type {import('xo').Options} */
module.exports = {
  ignores: [
    'dist',
    'hono.d.ts',
    'next.config.mjs',
    'node_modules',
    'postcss.config.js',
    'tailwind.config.cjs',
    'tsup.config.ts',
  ],
  extensions: ['ts', 'tsx'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'arrow-parens': 'off',
    'capitalized-comments': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/order': 'off',
    'jsx-quotes': 'off',
    'n/prefer-global/process': 'off',
    'new-cap': 'off',
    'no-await-in-loop': 'off',
    'no-promise-executor-return': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'quote-props': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-hex-escape': 'off',
    'unicorn/no-static-only-class': 'off',
  },
};

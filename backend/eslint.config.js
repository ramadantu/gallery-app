import prettier from 'eslint-plugin-prettier';

export default [
  {
    plugins: {
      prettier: prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
    ignores: ['node_modules/**'],
    rules: {
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
    },
  },
];

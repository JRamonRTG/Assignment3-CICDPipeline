// eslint.config.js
export default [
    {
      files: ['src/**/*.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'no-unused-vars': 'warn',
      },
    },
  ];
  
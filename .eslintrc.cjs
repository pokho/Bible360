module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-explicit-any': 'warn',
		'svelte/no-at-html-tags': 'error',
		'svelte/no-unused-html-attributes': 'error'
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			plugins: ['svelte3'],
			rules: {
				'svelte3/no-target-blank': 'error',
				'svelte3/no-deprecated-slot-attribute': 'error'
			}
		}
	],
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	globals: {
		// Add any global variables your project uses
	}
};
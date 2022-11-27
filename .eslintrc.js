module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	plugins: ['prettier'],
	extends: ['eslint:recommended', 'prettier'],
	rules: {
		semi: [2, 'never'],
		'comma-dangle': ['error', 'always-multiline'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/custom-event-name-casing': 'off',
		'prettier/prettier': ['error', { semi: false, endOfLine: 'auto' }],
		'vue/prop-name-casing': 'off',
	},
}

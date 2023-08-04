module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@babel/eslint-parser',
		sourceType: 'module',
		requireConfigFile: false,
		ecmaVersion: 2020,
		babelOptions: {
			parserOpts: {
				plugins: ['jsx']
			}
		}
	},
	extends: ['plugin:prettier/recommended'],
	// plugins: ['prettier'],
	rules: {
		indent: [2, 'tab'],
		semi: [2, 'never'],
		'no-tabs': 0,
		quotes: [2, 'single', { avoidEscape: true }],
		'vue/multi-word-component-names': 0,
		'comma-dangle': ['error', 'never'],
		// 'comma-dangle': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/custom-event-name-casing': 'off',
		'vue/prop-name-casing': 'off'
	}
}

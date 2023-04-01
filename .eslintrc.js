module.exports = {
	 root: true,
	env: {
			browser: true,
        node: true
    },
	extends: [
		 'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:eslint-plugin-nuxt',
		'prettier'
	],
	  parser: 'vue-eslint-parser',
	parserOptions: {
		'parser': '@babel/eslint-parser',
		'requireConfigFile': false,
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	plugins: [
		'prettier',
		'nuxt'
	],
	rules: {
		'prettier/prettier': [
			'error'
		],
			semi: [2, 'never'],
		'comma-dangle': ['error', 'always-multiline'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/custom-event-name-casing': 'off',
		'vue/prop-name-casing': 'off',
	}
}
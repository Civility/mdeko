module.exports = {
	extends: ['stylelint-config-tailwindcss', 'stylelint-config-recommended-vue'],
	rules: {
		'no-empty-source': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['apply', 'extends', 'tailwind', 'variants', 'responsive', 'screen', 'layer']
			}
		],
		'block-no-empty': null,
		'unit-allowed-list': ['em', 'rem', 'px', '%', 'deg', 'vh', 'vw', 'fr', 's', 'ms'],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null
	}
}

module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"react-app",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
			tsx: true,
		},
	},
	plugins: ["@typescript-eslint", "react"],
	rules: {},
};

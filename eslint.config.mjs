import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

const eslintConfig = [
	...compat.config({
		extends: ["airbnb-typescript/base", "next/core-web-vitals", "plugin:prettier/recommended"],
		rules: {
			"max-len": ["error", { code: 140 }],
			"quotes": [2, "double", { avoidEscape: true }],
			"prettier/prettier": [
				"error",
				{
					endOfLine: "auto",
				},
			],
		},
		parserOptions: {
			project: "./tsconfig.json",
		},
	}),
]

export default eslintConfig

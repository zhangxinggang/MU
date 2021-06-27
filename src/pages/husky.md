### git 提交检查

package.json

```
"devDependencies":{
	"husky": "^6.0.0",
	"lint-staged": "^10.5.4"
},
"scripts":{
	"postinstall": "npm run huskyInstall && npm run lintStaged",
	"huskyInstall": "./node_modules/.bin/husky install",
	"lintStaged": "./node_modules/.bin/husky add .husky/pre-commit './node_modules/.bin/lint-staged'"
},
"husky": {
	"hooks": {
		"pre-commit": "lint-staged"
	}
},
"lint-staged": {
	"**/*.{js,vue}": "./node_modules/.bin/eslint --fix"
}
```

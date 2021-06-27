### eslint 代码检查

package.json

```
"devDependencies":{
	"eslint": "^7.25.0"
},
"scripts":{
	"eslint": "npx eslint ./src/**/*.{js,vue}",
    "eslint-fix": "npx eslint --fix ./src/**/*.{js,vue}"
}
```

.eslintrc.js

```
/* eslint-disable */
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "off",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-useless-escape" : 0,
    "no-console": 0,
    "no-undef": 1,
    "no-alert": 2,
    'no-debugger': 'off',
    'no-empty': 1,
    'no-extra-parens': 0,
    'guard-for-in': 1,
    'no-extend-native': 1,
    'no-implicit-coercion': 0,
    'no-magic-numbers': 0,
    'no-param-reassign': 0,
    'no-warning-comments': 0,
    'radix': 0,
    'vars-on-top': 1,
    'no-delete-var': 0,
    'no-fallthrough': 2, // 禁止switch穿透
    'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明
    'eqeqeq': 0
  }
};
```

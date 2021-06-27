module.exports = {
    root: true,

    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true,
    },

    extends: ["eslint:recommended"],

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "babel-eslint",
    },

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? ["error", { allow: ["error"] }] : 0,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        "no-empty": 1,
        "no-extra-parens": 0,
        complexity: ["error", 8],
        "guard-for-in": 0,
        "no-extend-native": 1,
        "no-implicit-coercion": 0,
        "no-magic-numbers": 0,
        "no-param-reassign": 0,
        "no-mixed-spaces-and-tabs": 0,
        "no-warning-comments": 0,
        radix: 0,
        "no-tabs": ["error", { allowIndentationTabs: true }],
        "vars-on-top": 1,
        "no-delete-var": 0,
        "no-fallthrough": 2, // 禁止switch穿透
        "no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
        "no-func-assign": 2, // 禁止重复的函数声明
        indent: ["error", 4], // 4个空格缩进
        eqeqeq: 0,
        "vue/order-in-components": 2,
        "vue/attributes-order": 2,
    },
};

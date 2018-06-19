module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        // "standard",
        // "plugin:vue/base"
   ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        'no-console': 'off',
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        "semi": [
            "error",
            "never"
        ]
    },
    //　添加插件
    "plugins": [
        "vue"
    ]
};
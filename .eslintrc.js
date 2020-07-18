module.exports = {
  "extends": ["airbnb"],

  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      //"@typescript-eslint"
  ],
  rules: {
    "indent": ["error", 2], // A custom style-related rule for example
    "comma-dangle": [1, "always-multiline"],
    "react/jsx-filename-extension": "off",
    "react/require-default": "off",
    "react/forbid-prop-types": "off",
    "object-curly-newline": "off",
    "react/jsx-boolean-value": "off",
    "react/state-in-constructor": "off",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "react/sort-comp": "off",
    "max-len": ["error", { "code":120 }],
    "no-restricted-globals": "off",
    "import/prefer-default-export": "off",
    "new-cap": "off",
    "no-plusplus": "off",
    "no-use-before-define": "off",
    // "no-unused-vars": [
    //   "error",
    //   {
    //     varsIgnorePattern: "React"
    //   }
    // ],
    "no-unused-vars": "off",
    "no-console": ["error", { allow: ["warn", "info"] }],
    "no-param-reassign": "off",
    "max-classes-per-file": "off",
    "react/jsx-fragments": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "camelcase": "off",
    //"import/extensions": ["ignorePackages"],
  }
};

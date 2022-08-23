module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "no-shadow": "off",
    "comma-dangle": "off",
    "no-unused-vars": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
        paths: ["src"],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};

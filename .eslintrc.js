module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./packages/tsconfig.json"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react/recommended"
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/array-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
  }
};
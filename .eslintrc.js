module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    project: ["tsconfig.eslint.json", "tsconfig.json"],
  },
  rules: {
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
  },
  env: {
    node: true,
  },
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
    },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          [
            // Node.js builtins.
            `^node:`,
            `^(${require("module").builtinModules.join("|")})(/|$)`,
            // Packages.
            "^@?\\w",
            // Internal packages.
            "^(src)(/.*|$)",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
        ],
      },
    ],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
};

const js = require("@eslint/js");
const globals = require("globals");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  // Include ESLint's recommended rules directly
  js.configs.recommended,

  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // ✅ matches your project
      globals: {
        ...globals.node, // ✅ enables Node.js globals like process, __dirname
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "next" }], // ✅ ignore unused 'next' in middleware
    },
  },
];

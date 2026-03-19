module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "style", "docs", "refactor", "chore", "test", "ci"],
    ],
    "subject-case": [0],
  },
};

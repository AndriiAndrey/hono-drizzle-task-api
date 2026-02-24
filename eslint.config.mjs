import antfu from '@antfu/eslint-config'

export default antfu({
  type: "app",
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: "single",
  },
  ignores: ["**/migrations/*", "**/node_modules/*", "**/dist/*", "**/build/*", "**/pnpm-lock.yaml", "**/pnpm-workspace.yaml", "**/eslint.config.mjs"],
}, {
  rules: {
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      type: 'natural',
      order: 'asc',
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
})

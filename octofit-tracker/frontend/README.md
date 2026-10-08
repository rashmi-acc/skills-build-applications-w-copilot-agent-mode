# OctoFit Tracker Frontend

React 19 and Vite presentation tier with React Router and Bootstrap.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## API configuration

When running in Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local`. Use the Codespace name only, without a
protocol or port. For example:

```env
VITE_CODESPACE_NAME=my-codespace-name
```

Copy `.env.example` to `.env.local`, uncomment the variable, and replace the
example value. Restart Vite after changing the file. The frontend builds the API
URL as `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. If the variable is
unset or invalid, it safely falls back to `http://localhost:8000`.

Run the frontend from the workspace root with:

```bash
npm --prefix octofit-tracker/frontend run dev
```

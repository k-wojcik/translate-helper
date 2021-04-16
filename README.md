# Translate helper

[Hosted web](https://asmnh.github.io/translate-helper/#/)

Standalone vue3 app - scratchbook for translation and permission list to deal with later on.

For development info see [Development](docs/development.md).

## Status

| Check | Status |
|-------|--------|
| Deploy | [![Build and Deploy](https://github.com/asmnh/translate-helper/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/asmnh/translate-helper/actions/workflows/deploy.yml) |
| CodeQL | [![CodeQL](https://github.com/asmnh/translate-helper/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/asmnh/translate-helper/actions/workflows/codeql-analysis.yml) |
| Tests | [![Run tests](https://github.com/asmnh/translate-helper/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/asmnh/translate-helper/actions/workflows/test.yml) |

## What it does

It's a simple standalone application to help keeping track of added translation strings as you work on something, to make preparing translations changelist easier.

It supports arbitrary set of languages, assumes all translations are in form of JSON tree, and includes checking against potential tree conflict (when newly added key would conflict with existing one, by either overwriting text with tree node, or tree node with text). For conflict checks, you can provide external JSON URL that will be automatically loaded every time you open the app.

Exporting translations uses whatever format you prefer (see: Settings tab), which was intended to support CSV, SQL scripts (database inserts/updates) and potentially code snippet generation.

## Project goals

It's mostly my attempt at getting more familiar with frontend development, Vue.js and Typescript/Javascript. Don't expect this project to be anything clean and pristine, and probably you don't want to use it as an example of how good Vue.js project should look.

Functionally, it's supposed to be a second-screen tool to keep while working, to handle things such as translations, permissions (assuming key-based on/off permission system) and various other things that need to either be reconstructed when closing a task, or kept track of as you work.

Everything here is kept local browser only, meaning it doesn't require internet connection to work, and doesn't raise any security concerns that go beyond keeping your browser safe. Whatever remote communication there is (for now: requesting existing translations), it's kept as pull-only, and doesn't send *any* data entered into the app *anywhere* at all.

## Contributing

Any ideas, issues, and pull requests are welcome.

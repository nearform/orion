## Welcome to our knowledge base 🤓

This repo is a collection of modules that can be used as a foundation for a
static built, headless CMS driven knowledge base site.

### 3 modules organized as a monorepo using [lerna](https://github.com/lerna/lerna)

- components:

    - a component library based on [styled-components](https://www.styled-components.com/)
    - a design system with a `ThemeProvider` approach to theming and using
      [saluki](https://github.com/nearform/saluki) for its CSS-in-JS modular
      approach with sane defaults similar in concept to [tailwind](https://tailwindcss.com/docs/what-is-tailwind/)

- app:
    - a static build enabled app based on [gatsby](https://www.gatsbyjs.org)
    - Gatsby uses [graphql](https://graphql.org/) to fetch data optimally from the API

- api:
    - TBD

### Up and running:

```bash
git clone git@github.com:nearform/knowledgebase.git
cd knowledgebase
npm i // <-- lerna installs all deps in all packages
```

#### `packages/components`

```bash
npm run storybook // <-- run storybook
// other scripts are in package.json
```

#### `packages/app`

```bash
npm run develop // <-- run gatsby dev server
// other scripts are in package.json
```

#### Add new dependencies:

```bash
npx lerna add <npm-package-name> --scope=<package/module>
npx lerna add -D <npm-package-name> --scope=<package/module> // for dev dependeincies
```

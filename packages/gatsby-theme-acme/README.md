# gatsby-theme-acme

## Usage

Add this theme as a dependency to the package you want to use it in. Specifying the desired version number ensures yarn looks for the dependency locally rather than from the npm registry.

```
yarn add gatsby-theme-acme@<version-number>
```

Add the theme to your `gatsby-config.js`.

```
module.exports = {
  ...
  plugins: [
    `gatsby-theme-acme`,
    ...
  ],
}
```

You can now use Material UI components with the theming specified.

```
import React from "react"
import { Button } from "@material-ui/core"

const PrimaryButton = ({ label, action }) => (
  <Button onClick={action} variant="contained" color="primary">
    {label}
  </Button>
)

export default PrimaryButton
```

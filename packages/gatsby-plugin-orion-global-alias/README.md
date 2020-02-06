# gatsby-plugin-orion-global-namespace
> Global alias namespace for Orion on Gatsby

This plugin provides a global alias namespace for referencing components on Gatsby. The namespace allows both static and dynamic resolution of components under defined names.

# Installation

Add this plugin to a project by including its name in the list of plugins defined in the project's `gatsby-config.js`:

```javascript
    plugins: [
        'gatsby-plugin-orion-global-namespace',
        /* ... */
    ]
```

# Configuration

The plugin requires no specific configuration for general use, but provides the following two configuration options for oddball circumstances:

* `namespace`: The global alias namespace; defaults to `Orion`.
* `exts`: A list of allowed file extensions for component files; defaults to `['.js','.jsx','.json']`.

# Static imports

Components can be statically imported as follows:

```javascript
    import component from '@Orion/Components/ComponentA'
```

# Dynamic lookups

Components can be dynamically resolved at runtime (e.g. from a variable value) using the namespace's `lookup()` function:

```javascript
    import lookup from '@Orion'
    const name = 'ComponentA'
    const component = lookup('Components', name)
```

# Graphql

The plugin provides a graphql schema that can be used to query for available aliases during buildtime:
```graphql
  query {
    allGlobalAliases {
      edges {
        node {
          id
          namespace
          aliasName
          aliasType
          aliasPath
        }
      }
    }
  }
```

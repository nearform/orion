/* eslint-disable no-await-in-loop */

/**
 * Global namespace alias for Orion and Gatsby.
 * Allow components defined in separate Gatsby plugins to be loaded using
 * a global alias.
 *
 * Example:
 *
 * - Define an aliased component in a special location of a plugin's source:
 *
 *      gatsby-plugin-example/src/@Orion/Types/typea.js
 *
 * - Import the component using a global alias derived from the component name:
 *
 *      import typea from "@Orion/Types/typea"
 *
 * - Perform dynamic lookups using the global lookup function:
 *
 *      import lookup from '@Orion'
 *      const type = lookup('Types', name)
 *
 * The plugin also provides a custom graphql schema that allows querying of
 * available aliases via graphql:
 *
 *      query {
 *        allGlobalAliases {
 *          edges {
 *            node {
 *              id
 *              namespace
 *              aliasName
 *              aliasType
 *              aliasPath
 *            }
 *          }
 *        }
 *      }
 *
 * FOR REVIEW: Does the graphql schema contain a potential security hole? If
 * a static page query includes global aliases, then there's potential for the
 * alias path (which is an absolute file path) to be exposed and leak information
 * about the host system.
 * - A possible solution is to have an internal and external schema, with the
 *   alias path excluded from the external schema.
 * - Not clear yet whether a custom resolver could be used to hide the value when
 *   returning page query data.
 *
 */

const { dirname, join, resolve } = require('path')
const { writeFile } = require('fs').promises
const fg = require('fast-glob')

const { name: PluginName } = require('./package.json')

// The default global alias namespace.
const Namespace = '@Orion'

const SourceFileExtensions = ['.js', '.jsx', '.json']

// The graphql global alias schema.
const SchemaType = `type GlobalAliases implements Node @dontInfer {
    id: ID!
    aliasName: String!
    aliasType: String!
    aliasPath: String!
}`

const { createContentDigest } = require(`gatsby-core-utils`)

/** Register the GlobalAliases graphql schema. */
exports.createSchemaCustomization = function({ actions: { createTypes } }) {
  createTypes(SchemaType)
}

/**
 * A list of extended Webpack entry points. Each discovered aliased component
 * is added as an additional entry point.
 */
const entry = []
/**
 * A map of aliased component paths, keyed by alias ID.
 */
const alias = {}
/**
 * A list of static requires for each aliased component. Used in the global
 * lookup function.
 */
const requires = []

/** Search registered plugins for aliased components. */
exports.onPreBootstrap = async function(args, options) {
  const {
    store,
    actions: { createNode },
  } = args

  // Read the current namespace alias.
  const { namespace = Namespace, exts = SourceFileExtensions } = options

  // Read the list of configured plugins.
  const { flattenedPlugins: plugins } = store.getState()

  // Generate a list of theme plugin paths.
  const pluginPaths = plugins
    // Filter for theme plugins.
    .filter(plugin => /^gatsby-(theme|plugin)-/.test(plugin.name))
    // HACK: Filter out the gatsby-plugin-page-creator plugin.
    .filter(plugin => plugin.name !== 'gatsby-plugin-page-creator')
    // Inspect the plugin's package.json to get the actual path to the plugin's code.
    .map(plugin => getPluginSourcePath(plugin))

  // Get the host project plugin and prepend path to its source.
  const sitePlugin = plugins.find(
    plugin => plugin.name === 'default-site-plugin'
  )
  pluginPaths.push(getPluginSourcePath(sitePlugin))

  for (const pluginPath of pluginPaths) {
    const searchPath = join(pluginPath, namespace)
    const aliasPaths = await find(searchPath, exts)
    for (const aliasPath of aliasPaths) {
      const pathAlias = aliasPath.slice(
        searchPath.length,
        aliasPath.lastIndexOf('.')
      )

      // Add entry point.
      entry.push(aliasPath)

      // See https://webpack.js.org/configuration/resolve/#resolvealias
      const aliasName = join(namespace, pathAlias)
      const aliasID = aliasName + '$'
      alias[aliasID] = aliasPath

      // Add requires.
      const request = join(namespace, pathAlias)
      requires.push(request)

      // Create a type for the alias node; this is the alias name without
      // the namespace prefix and leading slash.
      const aliasType = dirname(pathAlias).slice(1)

      // Create a node for the alias.
      createNode({
        id: aliasID,
        parent: null,
        children: [],
        internal: {
          type: 'GlobalAliases',
          contentDigest: createContentDigest(aliasPath),
        },
        aliasName,
        aliasType,
        aliasPath,
      })
    }
  }

  alias[namespace + '$'] = await writeGlobalAlias(namespace, requires)
}

/** Update the Webpack configuration with global aliases. */
exports.onCreateWebpackConfig = async function(args) {
  const {
    getConfig,
    actions: { replaceWebpackConfig },
  } = args

  // Read alias property from the webpack config.
  const config = getConfig()

  // Update the webpack config.
  config.resolve.alias = Object.assign({}, config.resolve.alias, alias)

  const _entry = entry.slice()
  // Add default main entry.
  if (config.entry.main) {
    _entry.push(config.entry.main)
  }

  if (_entry.length > 0) {
    config.entry.main = _entry
  }

  replaceWebpackConfig(config)
}

/**
 * Read a plugin's source code path.
 */
function getPluginSourcePath(plugin, defaultLib) {
  const { name, resolve: path } = plugin
  try {
    const { directories: { lib = defaultLib } = {} } = require(join(
      path,
      'package.json'
    ))
    return lib ? join(path, lib) : path
  } catch {
    throw new Error(`${PluginName}: Unable to read package.json for ${name}`)
  }
}

/**
 * Find all files under a path with the specified extensions.
 */
function find(path, exts) {
  const fglob = join(path, '**', `*.{${exts.map(e => e.slice(1)).join(',')}}`)
  return fg([fglob])
}

/**
 * Write the global alias file.
 */
async function writeGlobalAlias(namespace, requires) {
  const outPath = resolve('./.cache/Global_alias.js')
  await writeFile(
    outPath,
    `// Generated by ${PluginName} ${new Date()}
const { join } = require('path')
const aliases = {}
${requires.map(r => `aliases['${r}'] = require('${r}').default`).join('\n')}
function lookup() {
  const args = ['${namespace}'].concat(Array.from(arguments).filter(a=>!!a))
  const alias = join.apply(this,args)
  const result = aliases[alias]
  if( result ) {
    return result
  }
  throw new Error('Alias not found: '+alias)
}
export default lookup
`
  )
  return outPath
}

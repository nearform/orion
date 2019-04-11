import { join } from 'path'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import clean from 'rollup-plugin-clean'
import pkg from './package.json'

const input = 'src/index.js'
const external = [
  'react',
  'react-dom',
  'prop-types',
  'react-helmet',
  'gatsby',
  'gatsby-image',
]

const commonPlugins = [
  clean(),
  resolve({
    preferBuiltins: true,
    browser: true,
  }),
  eslint(),
  json(),
  alias({
    resolve: ['.js', '.svg'],
    '~': join(__dirname, 'src'),
    assets: join(__dirname, 'src/assets'),
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
  }),
  commonjs({
    include: 'node_modules/**',
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    namedExports: {
      'node_modules/react-is/index.js': [
        'isElement',
        'isValidElementType',
        'ForwardRef',
      ],
      'node_modules/babel-plugin-macros/dist/index.js': [
        'MacroError',
        'createMacro',
      ],
    },
  }),
]

export default [
  {
    input,
    external,
    plugins: [...commonPlugins],
    output: [{ file: pkg.module, format: 'es' }],
  },
]

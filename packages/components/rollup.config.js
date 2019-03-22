import { join } from 'path'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
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
  'gatsby-image'
]

const commonPlugins = [
  clean(),
  resolve({
    preferBuiltins: true,
    browser: true
  }),
  json(),
  alias({
    resolve: ['.js', 'index.js', '.svg'],
    '~': join(__dirname, 'src'),
    assets: join(__dirname, 'src/assets')
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  commonjs()
]

export default [
  {
    input,
    external,
    plugins: [...commonPlugins],
    output: [{ file: pkg.module, format: 'es' }]
  }
]

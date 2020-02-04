const babelOptions = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/react',
    'babel-preset-gatsby',
  ],
  plugins: ['transform-es2015-modules-commonjs'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  config.module.rules.push({
    test: /\.graphql?$/,
    exclude: /node_modules/,
    loader: 'webpack-graphql-loader',
  })

  config.module.rules.push({
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  })

  config.resolve.extensions.push('.graphql')

  actions.replaceWebpackConfig(config)
}

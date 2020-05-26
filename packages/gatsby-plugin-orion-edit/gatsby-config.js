module.exports = {
  plugins: [
    'gatsby-plugin-orion-core',
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Titillium Web`,
            variants: [`300`, `400`, `700`],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Clarendon'],
          urls: ['https://use.typekit.net/bsj0ebg.css'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
}

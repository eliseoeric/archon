const chalk = require('chalk');
let contentfulConfig;

try {
  // attempt to get the contetnful config from .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// If we have env variables, use them over the values set in the .contentful.json
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(`Contentful spaceId and the accessToken need to be provided. Please run ${chalk.red('`yarn setup`')}.`)
}

module.exports = {
  siteMetadata: {
    title: `Archon - Gastby Contentful Framework`,
    description: `Archon is a Gatsby Contentful driven Framework for rapid development of static sites.`,
    author: `@eliseoeric`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/svg/
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `archon-framework`,
        short_name: `nyca`,
        start_url: `/`,
        background_color: `#f6f6f6`,
        theme_color: `#fc7459`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}

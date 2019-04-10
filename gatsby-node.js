/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/index.js');
  await graphql(
    `
    {
      allContentfulPage {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
    
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors);
      reject(result.errors);
    }

    const pages = result.data.allContentfulPage.edges;
    pages.forEach((page, index) => {
      createPage({
        path: `${page.node.slug}`,
        component: template,
        context: {
          slug: page.node.slug
        },
      })
    })
  })
}
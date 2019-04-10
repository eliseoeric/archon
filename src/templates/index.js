import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Module from "../components/Module";

const IndexPage = ({ data }) => {

  const renderModules = (modules) => {
    return modules.map((module) => {
      const {__typename, ...attributes} = module;
      return <Module attributes={attributes} type={__typename} />
    })
  }

  const {modules, slug} = data.contentfulPage;

  const inverseNav = slug === '/';
  const isLineGraphicActive = slug === '/';
  
  return (
    <Layout inverseNav={inverseNav} isLineGraphicActive={isLineGraphicActive}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      { renderModules(modules) }
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query($slug: String!) {
    contentfulPage (slug:{eq: $slug}) {
      title
      slug
      modules {
        __typename
        ...ContactContentModule
      }
    }
  }  
`
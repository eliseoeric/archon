import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import classnames from "classnames";

import Header from "../components/Header"
import Footer from '../components/Footer';
import "../styles/app.scss"

class Layout extends React.Component {

  static propTypes = {
    inverseNav: PropTypes.bool,
  }

  static defaultProps = {
    inverseNav: false,
  }

  render() {
    const { children, inverseNav } = this.props;

    return (
      <StaticQuery
        query={graphql`
        query {
          contentfulNavigationMenu {
            id
            investorLoginUrl
            menuItems {
              title
              slug
              id
            }
          }
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
        render={data => (
            <>
              <Header companyName={data.site.siteMetadata.title} navMenu={data.contentfulNavigationMenu.menuItems} inverseNav={inverseNav} investorLogin={data.contentfulNavigationMenu.investorLoginUrl} />
              <main className={classnames('site__main', {'site__main--inverse-nav': inverseNav})}>
                {children}
              </main>
              <Footer companyName={data.site.siteMetadata.title} navMenu={data.contentfulNavigationMenu.menuItems} investorLogin={data.contentfulNavigationMenu.investorLoginUrl}/>
            </>
        )}
      />
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

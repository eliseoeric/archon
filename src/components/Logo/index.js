import React from "react";
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from "gatsby";

import * as header from '../Header/header.module.scss';

export default class Logo extends React.Component {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: 'Nyca Logo',
  }

  render() {
    const { title } = this.props;

    return (
      <Link to='/' className={header.logo_box} title={title}>
        <StaticQuery
          query={graphql`
              query {
                logo: file(relativePath: { eq: "logo-color.png" } ) {
                  publicURL
                }
              }
            `}
          render={data => <img src={data.logo.publicURL} className={header.logo_image} alt={title} />}
        />
      </Link>
    )
  }
}

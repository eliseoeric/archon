import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "gatsby";

import Container from "../Container";
import Row from "../Row";
import ExternalLinkIcon from "../../images/svg/External-Link.svg";
import * as footer from './footer.module.scss';

export default class Footer extends React.Component {
  
  static propTypes = {
    companyName: PropTypes.string,
    navMenu: PropTypes.array,
    investorLoginUrl: PropTypes.string,
  }

  static defaultProps = {
    companyName: ``,
    navMenu: [],
    investorLoginUrl: '/'
  }

  render() {
    const {investorLoginUrl} = this.props;
    const navMenu = (navLinks) => (
      <ul className={classnames(footer.nav)}>

        {
          navLinks.map(link => 
              <li key={link.title} className={classnames(footer.nav_item, `nav-${link.slug}`)}>
                <Link to={link.slug} className={classnames(footer.nav_link, footer.nav_link__dark)}>{link.title}</Link>
              </li>
            )
        }

        <li className={classnames(footer.nav_item, footer.investor_login)}>
          <a href={investorLoginUrl} className={classnames(footer.nav_link, footer.nav_link__dark, footer.nav_link__login)}>Investor Login</a>
        </li>
      </ul>
    )

    return (
      <footer className={classnames(footer.site__footer)}>
        <div className={classnames(footer.main_box)}>
          <Container restricted className={classnames(footer.container)}>
            <Row className={classnames(footer.row)}>
              <div className={classnames(footer.box, footer.box__left)}>
                {navMenu(this.props.navMenu)}
              </div>

              <div className={classnames(footer.box, footer.box__right)}>
                <div className={classnames(footer.description_box)}>
                  <p className={classnames(footer.copywrite)}>© {new Date().getFullYear()} {this.props.companyName}. All rights reserved.</p>
                  <p className={classnames(footer.design_mark)}><a href="https://www.westonbaker.com" target="_blank" rel="noopener noreferrer">Site by Weston Baker Creative Group</a></p>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </footer>
    )
  }
}
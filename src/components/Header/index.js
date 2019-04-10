import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "gatsby";

import Container from "../Container";
import Logo from "../Logo";
import LogoInverse from "../LogoInverse";
import * as header from './header.module.scss';
import { noop } from "rxjs";
import ExternalLinkIcon from "../../images/svg/External-Link.svg";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.onNavClick = this.onNavClick.bind(this);
    this.fixSiteHeader = this.fixSiteHeader.bind(this);

    this.state = {
      isNavActive: props.isNavActive,
      isNavFixed: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixSiteHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSiteHeader);
  }

  fixSiteHeader() {
    const siteHeader = document.querySelector(`.${header.site__header}`);
    if (window.scrollY >= siteHeader.offsetHeight) {
      document.body.style.paddingTop = siteHeader.offsetHeight + 'px';
      siteHeader.classList.add(header.state_fixed);
      this.setState({
        isNavFixed: true,
      });
    } else {
      siteHeader.classList.remove(header.state_fixed);
      document.body.style.paddingTop = 0;
      this.setState({
        isNavFixed: false,
      });
    }
  }

  toggleNavigation() {
    this.setState(prevState => ({
      isNavActive: !prevState.isNavActive
    }));
    document.body.classList.toggle('navigation--active');
  }

  onNavClick() {
    const { isNavActive } = this.state;

    if (isNavActive) {
      document.body.classList.toggle('navigation--active');
    }
  }

  static propTypes = {
    companyName: PropTypes.string,
    navMenu: PropTypes.array,
    isNavActive: PropTypes.bool,
    onNavActive: PropTypes.func,
    onNavDeactive: PropTypes.func,
    inverseNav: PropTypes.bool,
    investorLoginUrl: PropTypes.string,
  }

  static defaultProps = {
    companyName: ``,
    navMenu: [],
    isNavActive: false,
    onNavActive: noop,
    onNavDeactive: noop,
    inverseNav: false,
    investorLoginUrl: '/',
  }

  render() {
    const { inverseNav, companyName, navMenu, investorLoginUrl } = this.props;
    const { isNavActive, isNavFixed } = this.state;

    const isInverseNav = (!isNavFixed && inverseNav);

    const navMenuComponent = (navLinks) => (
      <ul className={classnames(header.nav_list, header.item__desktop)}>
        {
          navLinks.map(link =>
            <li key={link.title} className={classnames(header.nav_item)}>
              <Link to={link.slug} className={classnames(header.nav_link, header.nav_link__dark)} activeClassName={header.active} onClick={this.onNavClick}>{link.title}</Link>
            </li>
          )
        }
        <li className={classnames(header.nav_item, header.investor_login)}>
          <a href={investorLoginUrl} className={classnames(header.nav_link, header.nav_link__dark, header.nav_link__login)} onClick={this.onNavClick}>Investor Login <span className={header.login_icon}><ExternalLinkIcon /></span></a>
        </li>
      </ul>
    )

    return (
      <header className={header.site__header} role="banner">
        <nav className={classnames(header.primary_navigation, header.site__navigation, { [header.state_opened]: isNavActive }, { [header.inverse]: inverseNav && !isNavFixed })}>
          <Container className={header.container}>
            <div className={header.left_box}>
              {isInverseNav && <LogoInverse title={companyName} />}
              {!isInverseNav && <Logo title={companyName} />}
            </div>

            <div className={header.right_box}>
              {navMenuComponent(navMenu)}

              <button
                className={classnames(header.burger_button, { [header.burger_button__dark]: !isInverseNav }, { [header.burger_button__white]: !inverseNav }, header.item__mobile, { [header.burger__state_opened]: this.state.isNavActive })}
                onClick={this.toggleNavigation}
              >
                Primary Navigation
              </button>
            </div>

          </Container>
        </nav>
      </header>
    )
  }
}

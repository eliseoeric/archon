import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Arrow from "../Arrow";
import * as anchor from "./anchor.module.scss";

export default class ArrowAnchor extends React.Component {

  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    url: '/',
    text: 'Click Here',
  }

  render() {
    const {url, text, className} = this.props;

    return (
      <a href={url} className={classnames(anchor.call_to_action, className)}>{text} <Arrow /></a>
    )
  }
}
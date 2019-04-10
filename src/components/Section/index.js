import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import Container from "../Container";
import Row from "../Row";
import * as section from './section.module.scss';

class Section extends React.Component {

  render() {
    const { textColor, background, style, className, rowClassName } = this.props;
    return(
      <section className={classnames(section.site_section, className, section[background], section[textColor])} style={style}>
        <Container>
          <Row className={rowClassName}>
            {this.props.children}
          </Row>
        </Container>
      </section>
    )
  }
}

export default Section
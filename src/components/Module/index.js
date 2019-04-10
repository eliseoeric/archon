import React from "react";

export default class Module extends React.Component {

  renderModule(type, attributes) {
    const moduleCallbacks = {
    
    }

    return moduleCallbacks[type](attributes);
  }

  render() {
    const { attributes, type } = this.props;
    return (this.renderModule(type, attributes));
  }
}
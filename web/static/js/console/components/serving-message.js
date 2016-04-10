import React, { Component, PropTypes as PT } from 'react'

class ServingMessage extends Component {

  static propTypes= {
    show: PT.bool.isRequired
  };

  render() {
    let classes = 'serving-message'
    if (!this.props.show) classes += ' hide'
    return <span className={classes}>Serving</span>
  }
}

export default ServingMessage

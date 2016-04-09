import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'

class MenuItem extends Component {

  static propTypes = {
    title:       PT.string,
    highlighted: PT.bool,
    selected:    PT.bool
  };

  render() {

    const classes = Classnames({
      'menu-item':  true,
      'game-start': this.props.highlighted,
      'selected':   this.props.selected
    })

    return <p className={classes}>{this.props.title}</p>
  }
}

export default MenuItem

import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'

class MenuItem extends Component {

  static propTypes = {
    title:       PT.string,
    highlighted: PT.bool,
    selected:    PT.bool
  };

  render() {

    const { highlighted, selected, title } = this.props

    const classes = Classnames({
      'menu-item':  true,
      'game-start': highlighted,
      'selected':   selected
    })

    return <p className={classes}>{title}</p>
  }
}

export default MenuItem

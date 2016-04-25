import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'

class MenuItem extends Component {

  static propTypes = {
    label:       PT.string,
    title:       PT.string,
    highlighted: PT.bool,
    selected:    PT.bool
  };

  static defaultProps = {
    highlighted: false,
    selected:    false
  };

  render() {

    const { highlighted, selected, title, label } = this.props

    const classes = Classnames('menu-item', {
      'active':   highlighted,
      'selected': selected
    })

    return (
      <p>
        { label ? <span className="menu-item label">{label}</span> : null }
        <span className={classes}>{title}</span>
      </p>
    )
  }
}

export default MenuItem

import React, { Component, PropTypes as PT } from 'react'
import classnames from 'classnames'

import styles from './menu-item.scss'

export default class MenuItem extends Component {

  static propTypes = {
    label:  PT.string,
    title:  PT.string,
    status: PT.string
  };

  labelStyles() {
    classnames(styles['menu-item'], styles.label)
  }

  menuItemStyles() {
    classnames(styles['menu-item'], styles[`menu-item_${this.props.status}`])
  }

  render() {

    const { title, label } = this.props

    return (
      <p>
        { label ? <span className={this.labelStyles()}>{label}</span> : null }
        <span className={this.menuItemStyles()}>
          {title}
        </span>
      </p>
    )
  }
}

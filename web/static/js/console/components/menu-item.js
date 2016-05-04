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
    return classnames(styles.menuItem, styles.label)
  }

  menuItemStyles() {
    return classnames(styles.menuItem, styles[this.props.status])
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

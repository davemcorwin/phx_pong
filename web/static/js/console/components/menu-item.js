import React, { Component, PropTypes as PT } from 'react'
import classnames from 'classnames'
import styles from './menu-item.scss'

class MenuItem extends Component {

  static propTypes = {
    label:  PT.string,
    title:  PT.string,
    status: PT.string
  };

  render() {

    const { status, title, label } = this.props

    return (
      <p>
        { label ? <span className={classnames(styles['menu-item'], styles.label)}>{label}</span> : null }
        <span className={classnames(styles['menu-item'], styles[`menu-item_${status}`])}>
          {title}
        </span>
      </p>
    )
  }
}

export default MenuItem

import React, { Component, PropTypes as PT } from 'react'
import classnames from 'classnames'
import styles from './player-container.scss'

import Menu from './menu'

export default class PlayerContainer extends Component {

  static propTypes = {
    status: PT.string,
    title:  PT.string.isRequired
  };

  render() {

    const { children, status, title } = this.props

    const classes = classnames(styles.playerContainer, styles[status])
    return (
      <div className={classes}>
      
        <p>{title}</p>

        {this.props.children}

        { status === 'on-fire' ?
          <img
            className={styles.flames}
            src="/images/flame.gif"/>
          : null
        }

      </div>
    )
  }
}

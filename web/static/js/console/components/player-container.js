import React, { Component, PropTypes as PT } from 'react'
import cn from 'classnames'
import styles from './player-container.scss'

import Menu from './menu'

export default class PlayerContainer extends Component {

  static propTypes = {
    status: PT.oneOfType([PT.string, PT.bool]),
    title:  PT.string.isRequired
  };

  render() {

    const { children, status, title } = this.props

    return (
      <div className={cn(styles.playerContainer)}>
        <div className={styles[status]}>
          <h1>{title}</h1>

          {this.props.children}

          { status === 'on-fire' ?
            <img
              className={styles.flames}
              src="/images/flame.gif"/>
            : null
          }
        </div>
      </div>
    )
  }
}

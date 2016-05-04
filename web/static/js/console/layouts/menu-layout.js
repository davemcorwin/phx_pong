import React, { Component, PropTypes as PT } from 'react'

import styles from './menu-layout.scss'

export default class MenuLayout extends Component {

  static propTypes = {
    title: PT.string
  };

  render() {
    return (
      <div>
        <h1 className={styles.header}>
          <img src="/images/rocket.png" />
          {this.props.title}
        </h1>

        {this.props.children}

        <p className={styles.footer}>&copy; LaunchPad Lab 2016</p>
      </div>
    )
  }
}

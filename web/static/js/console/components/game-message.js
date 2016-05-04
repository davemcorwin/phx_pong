import React, { Component, PropTypes as PT } from 'react'

import styles from './game-message.scss'

export default class GameMessage extends Component {

  static propTypes = {
    messages: PT.arrayOf(PT.string)
  };

  static defaultProps = {
    messages: []
  };

  render() {

    const { children, messages } = this.props

    return (
      <div className={styles.gameMessage}>
        { messages.map(msg => <p key={msg}>{msg}</p>) }
        { children }
      </div>
    )
  }
}

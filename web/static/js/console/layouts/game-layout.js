import React, { Component, PropTypes as PT } from 'react'
import styles from '../console.scss'

export default class GameLayout extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

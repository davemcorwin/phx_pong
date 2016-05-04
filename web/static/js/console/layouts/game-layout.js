import React, { Component, PropTypes as PT } from 'react'

export default class GameLayout extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

import React, { Component, PropTypes as PT } from 'react'

export default class ErrorPage extends Component {

  static propTypes = {
    reason: PT.shape({
      message: PT.string,
      data: PT.object,
      errors: PT.object
    }).isRequired
  };

  render() {
    const { reason } = this.props

    return (
      <div>
        <h1>Awww snap, something went wrong!</h1>
        <p>{reason.message}</p>
      </div>
    )
  }
}

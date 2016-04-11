import React, { Component, PropTypes as PT } from 'react'

class ErrorPage extends Component {

  static propTypes = {
    message: PT.string
  }

  render() {
    return (
      <div>
        <h1>Awww snap, something went wrong!</h1>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default ErrorPage

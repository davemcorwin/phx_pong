import React, { Component, PropTypes as PT } from 'react'
import { connect, PromiseState } from 'react-refetch'
import ErrorPage from './error-page'

class Container extends Component {

  static propTypes = {
    ps: PropTypes.instanceOf(PromiseState).isRequired,
    onPending: PropTypes.func,
    onRejection: PropTypes.func,
    onFulfillment: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPending: (meta) => <div/>,
    onRejection: (reason, meta) => <ErrorPage message={reason}/>,
  };

  render() {
    
    const { ps, onPending, onRejection, onFulfillment } = this.props

    if (ps.pending) {
      return onPending(ps.meta)
    } else if (ps.rejected) {
      return onRejection(ps.reason, ps.meta)
    } else if (ps.fulfilled) {
      return onFulfillment(ps.value, ps.meta)
    } else {
      console.log('invalid promise state', ps)
      return null
    }
  }
}

export default Container

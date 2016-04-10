import React, { Component, PropTypes as PT } from 'react'

const Key = {
  LEFT: 65,
  RIGHT: 66
}

class KeyHandler extends Component {

  static propTypes = {
    keys: PT.arrayOf(PT.number).isRequired,
    holdHandler: PT.func,
    tapHandler: PT.func
  };

  constructor() {
    super()

    this.handleKeyDown = ::this.handleKeyDown
    this.handleKeyUp = ::this.handleKeyUp
    this.currentKey = -1
    this.time = -1
  }

  handleKeyDown(event) {

    const { keys } = this.props

    if (!keys.includes(event.keyCode)) return

    if (this.currentKey === -1) {
      this.currentKey = event.keyCode
      this.time = Date.now()
    }
  }

  handleKeyUp(event) {

    const { holdHandler, tapHandler, keys } = this.props

    if (!keys.includes(event.keyCode)) return

    if (this.currentKey === event.keyCode) {
      if (Date.now() - this.time >= 500) {
        if (holdHandler) holdHandler(event.keyCode)
      } else {
        if (tapHandler) tapHandler(event.keyCode)
      }
      
      this.currentKey = -1
      this.time = -1
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default KeyHandler

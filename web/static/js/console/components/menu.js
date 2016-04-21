import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'
import KeyHandler, { Events } from '../lib/key-handler'
import MenuItem from './menu-item'

class Menu extends Component {

  static propTypes = {
    items:      PT.arrayOf(PT.object),
    listens:    PT.array.isRequired,
    onSelect:   PT.func,
    onUnSelect: PT.func,
    forceReset: PT.bool
  };

  constructor() {
    super()
    this.keyHandler = null
    this.state =  { highlighted: 0, selected: -1 }
  }

  componentDidMount() {
    this.keyHandler = KeyHandler.addListener(this.props.listens, ::this.handleKeyEvent)
  }

  componentWillUnmount() {
    KeyHandler.removeListener(this.keyHandler)
  }

  handleKeyEvent(event, key) {
    switch(event) {
      case Events.HOLD:
        this.handleKeyHold(key)
        break
      case Events.TAP:
        this.handleKeyTap(key)
        break
    }
  }

  handleKeyHold(key) {

    const { items, onSelect, onUnSelect } = this.props
    const { highlighted, selected } = this.state

    const item = items[highlighted]

    if (selected === -1) {
      this.setState({
        selected: highlighted,
        highlighted: -1
      }, () => { if (onSelect) onSelect(item) })
    } else {
      this.setState({
        highlighted: selected,
        selected: -1,
      }, () => { if (onUnSelect) onUnSelect(item) })
    }
  }

  handleKeyTap(key) {
    const { items } = this.props
    const { highlighted, selected } = this.state

    // Do nothing if item has been selected
    if (selected !== -1) return

    this.setState({highlighted: (highlighted + 1) % items.length})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceReset === true) {
      this.setState({ highlighted: 0, selected: -1 })
    }
  }

  render() {

    const { items, listens } = this.props
    const { highlighted, selected } = this.state

    return (
      <div>
        { items.map((item, idx) =>
          <MenuItem
            title={item.title}
            label={item.label}
            highlighted={highlighted === idx}
            selected={selected === idx}
            key={`item${idx}`}
          />)
        }
      </div>
    )
  }
}

export default Menu

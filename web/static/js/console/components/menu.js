import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'

import KeyHandler, { Events } from '../lib/key-handler'
import MenuItem from './menu-item'

export default class Menu extends Component {

  static propTypes = {
    items:      PT.arrayOf(PT.object),
    listens:    PT.array.isRequired,
    onSelect:   PT.func.isRequired,
    onUnSelect: PT.func
  };

  static defaultProps = {
    onSelect:   () => {},
    onUnSelect: () => {}
  };

  constructor() {
    super()
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
      if (item.stateful)
        this.setState({ highlighted: -1, selected: highlighted }, () => onSelect(item))
      else
        this.setState({ highlighted: 0, selected: -1 }, () => onSelect(item))
    } else {
      this.setState({ highlighted: selected, selected: -1}, () => onUnSelect(item))
    }
  }

  handleKeyTap(key) {
    const { items } = this.props
    const { highlighted, selected } = this.state

    // Do nothing if item has been selected
    if (selected !== -1) return

    this.setState({highlighted: (highlighted + 1) % items.length})
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
            status={highlighted === idx ? 'active' : selected === idx ? 'selected' : null}
            key={idx}
          />)
        }
      </div>
    )
  }
}

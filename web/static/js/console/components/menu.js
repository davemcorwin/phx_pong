import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'
import KeyHandler from './key-handler'
import MenuItem from './menu-item'

class Menu extends Component {

  static propTypes = {
    items:      PT.array,
    listens:    PT.array.isRequired,
    onSelect:   PT.func,
    onUnSelect: PT.func,
    forceReset: PT.bool
  };

  constructor() {
    super()
    this.state =  { highlighted: 0, selected: -1 }
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
      <KeyHandler
        keys={listens}
        tapHandler={::this.handleKeyTap}
        holdHandler={::this.handleKeyHold}>

        { items.map((item, idx) =>
          <MenuItem
            title={item.title}
            highlighted={highlighted === idx}
            selected={selected === idx}
            key={`item${idx}`}
          />)
        }
      </KeyHandler>
    )
  }
}

export default Menu

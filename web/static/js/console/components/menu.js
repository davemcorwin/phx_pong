import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'
import Key from 'keymaster'
import MenuItem from './menu-item'

class Menu extends React.Component {

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

  componentDidMount() {
    Key('a', () => console.log('omg!'))
  }

  // mixins: [KeyHandler],

  // hold(keyCode) {
  //   if (this.props.listens.indexOf(keyCode) === -1) {
  //     return;
  //   }
  //
  //   var item = this.props.items[this.state.highlighted];
  //
  //   if (this.state.selected === -1) {
  //     this.setState({
  //       selected: this.state.highlighted,
  //       highlighted: -1
  //     });
  //
  //     if (this.props.onSelect) {
  //       this.props.onSelect(item);
  //     }
  //
  //   } else {
  //     this.setState({
  //       highlighted: this.state.selected,
  //       selected: -1,
  //     });
  //
  //     if (this.props.onUnSelect) {
  //       this.props.onUnSelect(item);
  //     }
  //   }
  // }
  //
  // tap(keyCode) {
  //   if (this.props.listens.indexOf(keyCode) === -1) {
  //     return
  //   }
  //
  //   // Do nothing if item has been selected
  //   if (this.state.selected !== -1) {
  //     return
  //   }
  //
  //   var highlighted = (this.state.highlighted + 1) % this.props.items.length;
  //   this.setState({highlighted: highlighted})
  // }

  handleKeyPress(event) {
    console.log(event.key)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceReset === true) {
      this.setState({ highlighted: 0, selected: -1 })
    }
  }

  render() {

    const { items } = this.props
    const { highlighted, selected } = this.state

    return (
      <div>
        { items.map((item, idx) =>
          <MenuItem
            title={item.title}
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

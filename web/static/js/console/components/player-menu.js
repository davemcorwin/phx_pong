import React, { Component, PropTypes as PT } from 'react'

class PlayerMenu extends Component {

  static propTypes = {
      listens:        PT.arrayOf(PT.number).isRequired,
      menuItems:      PT.arrayOf(PT.object).isRequired,
      side:           PT.string,isRequired,
      handleSelect:   PT.func.isRequired,
      handleUnSelect: PT.func.isRequired
  };

  render() {

    const { handleSelect, handleUnSelect, listens, menuItems, side } = this.props

    return (
        <div className={`player-container ${side}`}>
          <p className="player-name">Choose Player</p>
          <Menu
            items={menuItems}
            listens={listens}
            onSelect={handleSelect}
            onUnSelect={handleUnSelect}
          />
        </div>
    )
  }
}

export default PlayerMenu

import React, { Component, PropTypes as PT } from 'react'
import Api from '../lib/api'
import { Game } from '../types'
import { Keys } from '../lib/key-handler'
import Menu from './menu'

class ServingMenu extends Component {

  static propTypes = {
    game: Game.isRequired,
    onChoose: PT.func.isRequired
  };

  onSelect(item) {
    this.props.onChoose(item.player.id)
  }

  render() {

    const { game: { player1, player2 } } = this.props

    const menuItems = [
      { title: player1.name, player: player1 },
      { title: player2.name, player: player2 }
    ]

    return (
      <div className="game-message">
        <p>Who serves first?</p>
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </div>
    )
  }
}

export default ServingMenu

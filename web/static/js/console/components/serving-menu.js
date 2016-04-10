import React, { Component, PropTypes as PT } from 'react'
import { Game } from './lib/types'
import { Keys } from './lib/key-handler'

class ServingMenu extends Component {

  static propTypes = {
    game: Game.isRequired
  };

  onSelect(item) {
    const { game } = this.props
    // Meteor.call("setFirstServer", game, item.player);
    Page(`/game/${game.id}/play`)
  }

  render() {

    const { game, game: { player1, player2 } } = this.props

    const menuItems = [
      { title: player1.name, player: player1 },
      { title: player2.name, player: player2 }
    ]

    return (
      <div className="game-message">
        <p>Who serves first?</p>
        <Menu
          items={menuItems}
          listens={[Keys.Left, Keys.Right]}
          onSelect={::this.onSelect}
        />
      </div>
    )
  }
}

export default ServingMenu

import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'

import { Game, Player } from './lib/types'
import { Keys } from './lib/key-handler'

class EndGameMessage extends Component {

  static propTypes = {
    game:    Game.isRequired,
    guest:   PT.bool,
    winner:  Player.isRequired
  };

  onSelect(item) {

    const { game, guest } = this.props

    switch(item.action) {
      case 'main':
        Page('/main')
        break
      default:
        const newFirstServer = game.firstServer === game.player1 ? game.player2 : game.player1

        if (guest)
          Page('/game_guest/new')
        else {
          // create new game
          const gameId = 1
          Page(`/game/${gameId}/play`)
        }
    }
  }

  render() {

    const { winner } = this.props

    const menuItems = [
      { title: "Play Again", action: "new" },
      { title: "Main Menu", action: "main"}
    ]

    return (
      <div className="game-message">
        <p>{winner.name} Wins!</p>
        <p>{winner.taunt}</p>
        <Menu
          items={menuItems}
          listens={[Keys.Left, Keys.Right]}
          onSelect={::this.onSelect}
        />
      </div>
    )
  }
}

export default EndGameMessage

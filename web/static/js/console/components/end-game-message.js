import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import Api from '../lib/api'
import { Game, Player } from '../types'
import { Keys } from '../lib/key-handler'
import Menu from './menu'

class EndGameMessage extends Component {

  static propTypes = {
    game:    Game.isRequired,
    guest:   PT.bool,
    winner:  Player.isRequired
  };

  onSelect(item) {

    const { game: { first_server, player1, player2 }, guest } = this.props

    switch(item.action) {
      case 'main':
        Page('/')
        break
      default:
        const newFirstServer = first_server === player1.id ? player2.user_id : player1.user_id

        if (guest)
          Page('/game_guest/new')
        else {
          // create new game
          Api.post('games', {
            game: {
              players: [
                { user_id: player1.user_id },
                { user_id: player2.user_id }
              ]
            }
          })
          // Set first server
          .then(({ data: { game } }) =>
            Api.patch(`games/${game.id}`, {
              game: {
                first_server: game.players.find(player => player.user_id === newFirstServer).id,
                players: game.players
              }
            })
          )
          .then(({ data: { game } }) => Page.redirect(`/game/${game.id}`) )
          .catch(response => {
            if (response instanceof Error) {
              this.setState({ status: 'error', message: response.message })
            } else {
              this.setState({ status: 'error', message: `${response.status}: ${JSON.stringify(response.data.errors)}` })
            }
          })
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
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </div>
    )
  }
}

export default EndGameMessage

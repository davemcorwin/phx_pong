import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { PromiseState } from 'react-refetch'

import connect from '../lib/api'
import { Keys } from '../lib/key-handler'
import { Game, Player } from '../types'

import Menu from './menu'

export class EndGameMessage extends Component {

  static propTypes = {
    createGame:       PT.func.isRequired,
    createGameResult: PT.instanceOf(PromiseState),
    game:    Game.isRequired,
    guest:   PT.bool,
    winner:  Player.isRequired
  };

  componentDidMount() {
    delete localStorage.gameId
  }

  componentWillReceiveProps(nextProps) {
    const { createGameResult } = nextProps
    if (createGameResult && createGameResult.fulfilled) {
      Page(`/game/${createGameResult.value.id}`)
    }
  }

  onSelect(item) {

    const { game: { first_server, player1, player2 }, guest } = this.props

    switch(item.action) {

      case 'main':
        Page('/')
        break

      case 'new':
        if (guest)
          Page('/game_guest/new')
        else {
          const newFirstServer = first_server === player1.id ? player2.user_id : player1.user_id
          this.props.createGame([player1, player2], newFirstServer)
        }
        break
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

export default connect(props => ({
  createGame: (players, newFirstServer) => ({
    createGameResult: {
      url: '/games',
      method: 'POST',
      body: {
        game: {
          players: players.map(player => ({ user_id: player.user_id }))
        }
      },
      then: game => ({
        url: `/games/${game.id}`,
        method: 'PATCH',
        body: {
          game: {
            first_server: game.players.find(player => player.user_id === newFirstServer).id,
            players: game.players
          }
        }
      })
    }
  })
}))(EndGameMessage)

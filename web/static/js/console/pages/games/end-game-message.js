import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { PromiseState } from 'react-refetch'

import connect from '../../lib/api'
import { Keys } from '../../lib/key-handler'
import { Game, Player } from '../../types'
import { GameMessage, Menu } from '../../components'

export class EndGameMessage extends Component {

  static propTypes = {
    createGame:       PT.func.isRequired,
    createGameResult: PT.instanceOf(PromiseState),
    game:             Game.isRequired,
    winner:           Player.isRequired
  };

  componentDidMount() {
    delete localStorage.gameId
  }

  componentWillReceiveProps(nextProps) {
    const { createGameResult } = nextProps
    if (createGameResult && createGameResult.fulfilled) {
      Page(`/games/${createGameResult.value.id}`)
    }
  }

  onSelect(item) {

    const { game: { first_server, player1, player2 } } = this.props

    switch(item.action) {

      case 'main':
        Page('/')
        break

      case 'new':
        const newFirstServer = first_server === player1.id ? player2.user_id : player1.user_id
        this.props.createGame([
          { user_id: player1.user_id, position: player1.position },
          { user_id: player2.user_id, position: player2.position }
        ], newFirstServer)
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
      <GameMessage messages={[`${winner.name} Wins!`, winner.taunt]}>
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </GameMessage>
    )
  }
}

export default connect(props => ({
  createGame: (players, newFirstServer) => ({
    createGameResult: {
      url: '/games',
      method: 'POST',
      body: { game: { players: players } },
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

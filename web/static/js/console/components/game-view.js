import React, { Component, PropTypes as PT } from 'react'
import { PromiseState } from 'react-refetch'
import connect from '../lib/api'
import * as Game from '../lib/game'
import Settings from '../lib/settings'
import PlayerPanel    from './player-panel'
import EndGameMessage from './end-game-message'
import ServingMenu    from './serving-menu'
import Container      from './container'

export class GameView extends Component {

  static propTypes = {
    gameFetch: PT.instanceOf(PromiseState).isRequired,
    updateGame: PT.func.isRequired
  };

  handleScore(game, player) {

    if (!Game.inProgress(game)) return

    let score = player.score + 1
    const log = [player.id]

    if (Settings.nbaJamMode && Game.playerStatus(game, player) === 'on-fire') {
      score += 1
      log.push(player.id)
    }

    const playerIdx = game.players.findIndex(val => val.id === player.id)
    const newGame = update(game, {
      log: {$push: log},
      players: {$splice: [[playerIdx, 1, update(player, { score: x => x + score }) ]]}
    })

    this.props.updateGame(newGame)
  }

  render() {

    const { gameFetch, updateGame } = this.props

    <Container ps={gameFetch} onFulfillment={game => {

      const { player1, player2 } = game

      return (
        <div className="game-container">
          <PlayerPanel
            isServer={Game.isServer(game, player1)}
            key={Keys.LEFT}
            onScore={this.handleScore.bind(this, game, player1)}
            player={player1}
            playerStatus={Settings.nbaJamMode && Game.playerStatus(game, player1)} />

          <PlayerPanel
            isServer={Game.isServer(game, player2)}
            key={Keys.RIGHT}
            onScore={this.handleScore.bind(this, game, player2)}
            player={player2}
            playerStatus={Settings.nbaJamMode && Game.playerStatus(game, player2)} />

          { Game.isPending(game) ?
              <ServingMenu game={game} onChoose={updateGame}/> : null
          }

          { Game.isOver(game) ?
              <EndGameMessage game={game} winner={Game.winner(game)} /> : null
          }
        </div>
      )
    }} />
  }
}

export default connect(props => ({
  gameFetch: `/games/${props.gameId}`,
  updateGame: game => ({
    gameFetch: {
      url: `/games/${props.gameId}`,
      method: 'PATCH',
      body: JSON.stringify({ game: game })
    }
  })
}))(GameView)

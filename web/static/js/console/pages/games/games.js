import React, { Component, PropTypes as PT } from 'react'
import Update from 'react-addons-update'
import { PromiseState } from 'react-refetch'

import connect        from '../../lib/api'
import * as Game      from '../../lib/game'
import { Keys }       from '../../lib/key-handler'
import { Container }  from '../../components'
import PlayerPanel    from './player-panel'
import EndGameMessage from './end-game-message'
import ServingMenu    from './serving-menu'

export class Games extends Component {

  static contextTypes = {
    nbaJamMode: PT.bool.isRequired
  };

  static propTypes = {
    gameFetch: PT.instanceOf(PromiseState).isRequired,
    updateGame: PT.func.isRequired
  };

  handleScore(game, player) {

    if (!Game.inProgress(game)) return

    const { nbaJamMode } = this.context

    let score = 1
    const log = [player.id]

    if (nbaJamMode && Game.playerStatus(game, player) === 'on-fire') {
      score += 1
      log.push(player.id)
    }

    const playerIdx = game.players.findIndex(val => val.id === player.id)
    const newGame = Update(game, {
      log: {$push: log},
      players: {$splice: [[playerIdx, 1, Update(player, { score: { $apply: x => x + score } }) ]]}
    })

    this.props.updateGame(newGame)
  }

  componentDidMount() {
    localStorage.gameId = this.props.gameId
  }

  render() {

    const { nbaJamMode } = this.context
    const { gameFetch, updateGame } = this.props

    return (
      <Container ps={gameFetch} onFulfillment={game => {

        const { player1, player2 } = game

        return (
          <div>
            <PlayerPanel
              active={Game.inProgress(game)}
              isServer={Game.isServer(game, player1)}
              listenKey={Keys.LEFT}
              onScore={this.handleScore.bind(this, game, player1)}
              player={player1}
              playerStatus={Game.playerStatus(game, player1, nbaJamMode)} />

            <PlayerPanel
              active={Game.inProgress(game)}
              isServer={Game.isServer(game, player2)}
              listenKey={Keys.RIGHT}
              onScore={this.handleScore.bind(this, game, player2)}
              player={player2}
              playerStatus={Game.playerStatus(game, player2, nbaJamMode)} />

            { Game.isPending(game) ?
                <ServingMenu game={game} onChoose={updateGame}/> : null
            }

            { Game.isOver(game) ?
                <EndGameMessage game={game} winner={Game.winner(game)} /> : null
            }
          </div>
        )
      }} />
    )
  }
}

export default connect(props => ({
  gameFetch: `/games/${props.gameId}`,
  updateGame: game => ({
    gameFetch: {
      url: `/games/${props.gameId}`,
      method: 'PATCH',
      body: { game },
      refreshing: true
    }
  })
}))(Games)

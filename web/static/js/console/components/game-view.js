import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import Api from '../lib/api'
import * as Game from '../lib/game'
import Settings from '../lib/settings'
import KeyHandler, { Events, Keys } from '../lib/key-handler'
import PlayerScore from './player-score'
import EndGameMessage from './end-game-message'
import ServingMenu from './serving-menu'
import ErrorPage from './error-page'

class GameView extends Component {

  static propTypes = {
    gameId: PT.string.isRequired
  };

  constructor() {
    super()
    this.keyHandler = null
    this.state = {
      game: null,
      status: 'pending'
    }
  }

  componentDidMount() {
    this.fetchGame(this.props.gameId)
    this.keyHandler = KeyHandler.addListener([Keys.LEFT, Keys.RIGHT], ::this.handleKey)
  }

  componentWillReceiveProps({gameId}) {
    if (gameId !== this.state.game.id)
      this.fetchGame(gameId)
  }

  componentWillUnmount() {
    KeyHandler.removeListener(this.keyHandler)
  }

  fetchGame(gameId) {
    Api.get(`games/${gameId}`)
      .then(response => {
        this.setState({ status: 'ready', game: response.data.game })
        localStorage.gameId = gameId
      })
      .catch(response => {
        console.log(response)
        if (response instanceof Error) {
          this.setState({ status: 'error', message: response.message })
        } else {
          this.setState({ status: 'error', message: `${response.status}: ${response.data}` })
        }
      })
  }

  handleKey(event, key) {

    const { game, game: { player1, player2 } } = this.state

    if (!Game.inProgress(game)) return

    switch(event) {

      case Events.HOLD:
        Page('/')
        break

      case Events.TAP:

        const pointPlayer = key === Keys.LEFT ? player1 : player2
        pointPlayer.score += 1
        const log = game.log.concat(pointPlayer.id)

        if (Settings.nbaJamMode && Game.playerStatus(game, pointPlayer) === 'on-fire') {
          pointPlayer.score += 1
          log.push(pointPlayer.id)
        }

        Api.patch(`games/${game.id}`, { game: {
          log: log,
          players: [player1, player2]
        }})
        .then(response =>
          this.setState({ status: 'ready', game: response.data.game })
        )
        .catch(response => {
          if (response instanceof Error) {
            this.setState({ status: 'error', message: response.message })
          } else {
            console.log(response)
            this.setState({ status: 'error', message: `${response.status}: ${JSON.stringify(response.data.errors)}` })
          }
        })
    }
  }

  handleChoice(serverId) {
    Api.patch(`games/${this.state.game.id}`, { game: {
      first_server: serverId
    }}).then(response =>
      this.setState({ status: 'ready', game: response.data.game })
    )
    .catch(response => {
      if (response instanceof Error) {
        this.setState({ status: 'error', message: response.message })
      } else {
        this.setState({ status: 'error', message: `${response.status}: ${response.data}` })
      }
    })
  }

  render() {
    switch(this.state.status) {
      case 'pending':
        return null
      case 'error':
        return <ErrorPage message={this.state.message} />
      default:
        return this.view()
    }
  }

  view() {

    const { game, game: { player1, player2 } } = this.state

    return (
      <div className="game-container">
        <PlayerScore
          isServing={Game.isServer(game, player1)}
          playerName={player1.name}
          score={player1.score}
          status={Game.playerStatus(game, player1)}
        />
        <PlayerScore
          isServing={Game.isServer(game, player2)}
          playerName={player2.name}
          score={player2.score}
          status={Game.playerStatus(game, player2)}
        />

        { Game.isPending(game) ?
            <ServingMenu game={game} onChoose={::this.handleChoice}/> : null
        }

        { Game.isOver(game) ?
            <EndGameMessage game={game} winner={Game.winner(game)} /> : null
        }
      </div>
    )
  }
}

export default GameView

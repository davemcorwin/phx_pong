import React, { Component, PropTypes as PT } from 'react'
import Api from '../lib/api'
import * as Game from '../lib/game'
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
    Api.get(`games/${this.props.gameId}`)
      .then(response =>
        this.setState({ status: 'ready', game: response.data.game })
      )
      .catch(response => {
        console.log(response)
        if (response instanceof Error) {
          this.setState({ status: 'error', message: response.message })
        } else {
          this.setState({ status: 'error', message: `${response.status}: ${response.data}` })
        }
      })

    this.keyHandler = KeyHandler.addListener([Keys.LEFT, Keys.RIGHT], ::this.handleKeyTap)
  }

  componenWillUnmount() {
    KeyHandler.removeListener(this.keyHandler)
  }

  handleKeyTap(event, key) {
    switch(event) {
      case Events.TAP:

        const { game, game: { player1, player2 } } = this.state

        if (!Game.inProgress(game)) return

        Api.patch(`games/${game.id}`, { game: {
          players: [
            Object.assign({}, player1, { score: player1.score + (key === Keys.LEFT ? 1 : 0)}),
            Object.assign({}, player2, { score: player2.score + (key === Keys.LEFT ? 0 : 1)})
          ]
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
  }

  handleChoice(serverId) {
    Api.patch(`games/${this.state.game.id}`, { game: {
      status: 'in-progress',
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
          side="left"
        />
        <PlayerScore
          isServing={Game.isServer(game, player2)}
          playerName={player2.name}
          score={player2.score}
          side="right"
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

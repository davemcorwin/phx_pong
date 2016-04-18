import React, { Component, PropTypes as PT } from 'react'
import Api from '../lib/api'
import * as Game from '../lib/game'
import KeyHandler, { Events, Keys } from '../lib/key-handler'
import PlayerScore from './player-score'
import EndGameMessage from './end-game-message'
import ServingMenu from './serving-menu'

class GameView extends Component {

  static propTypes = {
    gameId: PT.string.isRequired
  };

  constructor() {
    super()
    this.keyHandler = null
    this.state = {
      game: null,
      isReady: false
    }
  }

  componentDidMount() {
    Api.get(`games/${this.props.gameId}`)
      .then(response =>
        this.setState({ status: 'ready', game: response.data.game })
      )
      .catch(response => {
        if (response instanceof Error) {
          this.setState({ status: 'error', message: response.message })
        } else {
          this.setState({ status: 'error', message: `${response.status}: ${response.data}` })
        }
      })

    this.setState({ isReady: true, game: game })

    this.keyHandler = KeyHandler.addListener([Keys.LEFT, Keys.RIGHT], ::this.handleKeyTap)
  }

  componenWillUnmount() {
    KeyHandler.removeListener(this.keyHandler)
  }

  handleKeyTap(event, key) {
    switch(event) {
      case Events.TAP:
        const { game } = this.state

        if (!Game.inProgress(game)) return

        // update game in db
        this.setState({ game: Object.assign({}, game, {
          player1Score: game.player1Score + (key === Keys.LEFT ? 1 : 0),
          player2Score: game.player2Score + (key === Keys.LEFT ? 0 : 1)
        })})
    }
  }

  render() {

    if (!this.state.isReady) return null

    const { game, game: { player1, player2 } } = this.state

    return (
      <div className="game-container">
        <PlayerScore
          isServing={Game.isServer(game, player1)}
          playerName={player1.name}
          score={game.player1Score}
          side="left"
        />
        <PlayerScore
          isServing={Game.isServer(game, player2)}
          playerName={player2.name}
          score={game.player2Score}
          side="right"
        />

        { Game.isPending(game) ?
            <ServingMenu game={game}/> : null
        }

        { Game.isOver(game) ?
            <EndGameMessage game={game} winner={Game.winner(game)} /> : null
        }
      </div>
    )
  }
}

export default GameView

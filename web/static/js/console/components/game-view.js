import React, { Component, PropTypes as PT } from 'react'
import * from './lib/game'
import KeyHandler, { Events, Keys } from './lib/key-handler'
import PlayerScore from './player-score'
import EndGameMessage from './end-game-message'
import ServingMenu from './serving-menu'

class GameView extends Component {

  constructor() {
    super()
    this.keyHandler = null
    this.state = {
      game: null,
      isReady: false
    }
  }

  componentDidMount() {
    const game = {
      id: 1,
      player1: { id: 1, name: 'Dave', taunt: 'mUahahaha', wins: 4, losses: 0},
      player2: { id: 2, name: 'Ryan', taunt: 'old', wins: 1, losses: 3},
      player1Score: 12,
      player2Score: 15,
      details: {
        points:       [1,2,1,2,1,2,1,2,1,2],
        first_server: 1,
        status: 'in-progress'
      },
      winner: null
    }

    this.setState({ isReady: true, game: game })

    this.keyHandler = KeyHander.register([Keys.LEFT, Keys.RIGHT], ::this.handleKeyTap)
  }

  componenWillUnmount() {
    KeyHandler.unregister(this.keyHandler)
  }

  handleKeyTap(event, key) {
    switch(event) {
      case Events.TAP:
        const { game } = this.state

        if (!inProgress(game)) return

        // update game in db
        this.setState({ game: Object.assign({}, game, {
          player1Score: game.player1Score + (key === Keys.LEFT ? 1 : 0),
          player2Score: game.player2Score + (key === Keys.LEFT ? 0 : 1)
        })})
    }
  }

  render() {

    const { game } = this.state

    return (
      <div className="game-container">
        <PlayerScore
          isServing={currentServer(game) === game.player1.id}
          playerName={game.player1.name}
          score={game.player1Score}
          side="left"
        />
        <PlayerScore
          isServing={currentServer(game) === game.player2.id}
          playerName={game.player2.name}
          score={game.player2Score}
          side="right"
        />

        { isPending(game) ?
            <ServingMenu game={game}/> : null
        }

        { isOver(game) ?
            <EndGameMessage game={game} winner={winner(game)} /> : null
        }
      </div>
    )
  }
}

export default GameView

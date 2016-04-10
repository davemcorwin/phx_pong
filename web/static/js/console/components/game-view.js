import React, { Component, PropTypes as PT } from 'react'

import * from './lib/game'
import KeyHandler, { Keys } from './lib/key-handler'
import PlayerScore from './player-score'
import EndGameMessage from './end-game-message'
import ServingMenu from './serving-menu'

class GameView extends Component {

  constructor() {
    super()
    this.state = {
      game: null,
      isReady: false
    }
  }

  componentWillMount() {
  //   const game = Games.findOne(this.props.params.id);
  //
  //   return {
  //     game:    game,
  //     player1: Players.findOne(game.player1),
  //     player2: Players.findOne(game.player2)
  //   };
  }

  handleKeyTap(key) {

    const { game } = this.state

    if (!inProgress(game)) return

    const player1Score = game.player1Score + (key === Keys.LEFT ? 1 : 0),
          player2Score = game.player2Score + (key === Keys.LEFT ? 0 : 1)

    // Meteor.call("updateGame", this.data.game, player1Score, player2Score, this.data.player1, this.data.player2);
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
            <EndGameMessage
              game={game}
              winner={winner(game)}
              player1={game.player1}
              player2={game.player2} /> : null
          }
      </div>
    )
  }
}

export default GameView

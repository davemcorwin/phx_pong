import React, { Component, PropTypes as PT } from 'react'
import ServingMessage from './serving-message'

class PlayerScore extends Component {

  static propTypes = {
    isServing:  PT.bool.isRequired,
    playerName: PT.string,
    score:      PT.number.isRequired,
    side:       PT.string.isRequired
  };

  static defaultProps = {
    playerName: 'Unknown'
  };

  render() {

    const { isServing, playerName, score, side } = this.props

    return (
      <div className={`player-container ${side}`}>
        <p className="player-name">{playerName}</p>
        <h1 className="score">{score}</h1>
        <ServingMessage show={isServing} />
      </div>
    )
  }
}

export default PlayerScore

import React, { Component, PropTypes as PT } from 'react'

class Leaderboard extends Component {

  static propTypes = {
    players: PT.arrayOf(PT.shape({
      name: PT.string,
      wins: PT.number,
      losses: PT.number
    }))
  };

  render() {

    const { players } = this.props

    return (
      <ul className="leader-board">
        { players.map(player =>
            <li key={player.name}>
              <span className="name">{player.name}</span>
              <span className="record">{player.wins} - {player.losses}</span>
            </li>
          )
        }
      </ul>
    )
  }
}

export default Leaderboard

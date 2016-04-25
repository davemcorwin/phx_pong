import React, { Component, PropTypes as PT } from 'react'
import { User } from '../types'

class Leaderboard extends Component {

  static propTypes = {
    users: PT.arrayOf(User).isRequired
  };

  render() {

    return (
      <ul className="leader-board">
        { this.props.users.map(user =>
            <li key={user.name}>
              <span className="name">{user.name}</span>
              <span className="record">{user.wins} - {user.losses}</span>
            </li>
          )
        }
      </ul>
    )
  }
}

export default Leaderboard

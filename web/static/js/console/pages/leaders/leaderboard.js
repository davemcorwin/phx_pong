import React, { Component, PropTypes as PT } from 'react'

import { User } from '../../types'
import styles from './leaderboard.scss'

class Leaderboard extends Component {

  static propTypes = {
    users: PT.arrayOf(User).isRequired
  };

  render() {

    return (
      <ul className={styles.leaderboard}>
        { this.props.users.map(user =>
            <li key={user.name}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.record}>{user.wins} - {user.losses}</span>
            </li>
          )
        }
      </ul>
    )
  }
}

export default Leaderboard

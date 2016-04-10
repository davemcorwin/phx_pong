import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { Keys } from '../lib/key-handler'
import PlayerMenu from './player-menu'

class ChoosePlayerView extends Component {

  constructor() {
    super()
    this.state = {
      isReady: false,
      players: [],
      player1: null,
      player2: null
    }
  }

  componentDidMount() {

    const players = [
      { id: 1, name: 'Dave', taunt: 'mUahahaha', wins: 4, losses: 0},
      { id: 2, name: 'Ryan', taunt: 'old', wins: 1, losses: 3}
    ]

    this.setState({ isReady: true, players: players})
  }

  componentWillUpdate(_, nextState) {

    const { player1, player2 } = nextState

    if (player1 && player2) {
      //create a new game then
      const id = 1
      Page(`/game/${id}`)
    }
  }

  selectPlayer(player, item) {
    this.setState({ [player]: item.player })
  }

  unSelectPlayer(player) {
    this.setState({ [player]: null })
  }

  render() {

    const { isReady, players } = this.state

    if (!isReady) return null

    const menuItems = players.map(player => {
      return { title: player.name, player: player }
    })

    return (
      <div className="game-container">
        <PlayerMenu
          menuItems={menuItems}
          listens={[Keys.LEFT]}
          handleSelect={this.selectPlayer.bind(this, 'player1')}
          handleUnSelect={this.unSelectPlayer.bind(this, 'player1')}
          side="left"
        />
        <PlayerMenu
          menuItems={menuItems}
          listens={[Keys.RIGHT]}
          handleSelect={this.selectPlayer.bind(this, 'player2')}
          handleUnSelect={this.unSelectPlayer.bind(this, 'player2')}
          side="right"
        />
      </div>
    )
  }
}

export default ChoosePlayerView

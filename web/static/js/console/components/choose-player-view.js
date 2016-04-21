import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import Api from '../lib/api'
import { Keys } from '../lib/key-handler'
import PlayerMenu from './player-menu'
import ErrorPage from './error-page'

class ChoosePlayerView extends Component {

  constructor() {
    super()
    this.state = {
      status: 'pending',
      players: [],
      player1: null,
      player2: null
    }
  }

  componentDidMount() {

    Api.get('players')
      .then(response =>
        this.setState({ status: 'ready', players: response.data.data })
      )
      .catch(response => {
        if (response instanceof Error) {
          this.setState({ status: 'error', message: response.message })
        } else {
          this.setState({ status: 'error', message: `${response.status}: ${JSON.stringify(response.data.errors)}` })
        }
      })
  }

  componentWillUpdate(_, nextState) {

    const { player1, player2, status } = nextState

    if (status !== 'error' && player1 && player2) {
      Api.post('games', {
        game: {
          players: [
            { user_id: player1.id },
            { user_id: player2.id }
          ],
          status: 'pending'
        }
      })
      .then(response =>
        Page(`/game/${response.data.game.id}`)
      )
      .catch(response => {
        if (response instanceof Error) {
          this.setState({ status: 'error', message: response.message })
        } else {
          this.setState({ status: 'error', message: `${response.status}: ${JSON.stringify(response.data.errors)}` })
        }
      })
    }
  }

  selectPlayer(player, item) {
    this.setState({ [player]: item.player })
  }

  unSelectPlayer(player) {
    this.setState({ [player]: null })
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

    const { players } = this.state

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

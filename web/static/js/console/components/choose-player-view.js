import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import Api from '../lib/api'
import { Keys } from '../lib/key-handler'
import PlayerMenu from './player-menu'

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
          // Something happened in setting up the request that triggered an Error
          this.setState({ status: 'error', message: response.message })
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          this.setState({ status: 'error', message: `${response.status}: ${response.data}` })
        }
      })
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

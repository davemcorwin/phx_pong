import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { PromiseState } from 'react-refetch'

import connect from '../lib/api'
import { Keys } from '../lib/key-handler'

import PlayerMenu from './player-menu'
import ErrorPage from './error-page'
import Container  from './container'

class ChoosePlayerView extends Component {

  static propTypes = {
    usersFetch: PT.instanceOf(PromiseState).isRequired,
    createGame: PT.func.isRequired,
    createGameResult: PT.instanceOf(PromiseState),
  };

  constructor() {
    super()
    this.state = { player1: null, player2: null }
  }

  componentWillReceiveProps(nextProps) {

    const { createGameResult } = nextProps

    if (createGameResult) {
      if (createGameResult.fulfilled) {
        Page(`/game/${createGameResult.value.id}`)
      } else if (createGameResult.rejected) {
        this.setState({error: createGameResult.reason})
      }
    }
  }

  selectPlayer(player, item) {
    this.setState({ [player]: item.user }, () => {
      const { player1, player2 } = this.state
      if (player1 && player2) {
        this.props.createGame([player1, player2])
      }
    })
  }

  unSelectPlayer(player) {
    this.setState({ [player]: null })
  }

  render() {
    return (
      <Container ps={this.props.usersFetch} onFulfillment={::this.view} />
    )
  }

  view(users) {

    if (this.state.error) return <ErrorPage reason={this.state.error}/>

    const menuItems = users.map(user => ({
      title: user.name, user: user, stateful: true
    }))

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

export default connect(props => ({
  usersFetch: '/users',
  createGame: users => ({
    createGameResult: {
      url: '/games',
      method: 'POST',
      body: {
        game: {
          players: users.map(user => ({ user_id: user.id }))
        }
      }
    }
  })
}))(ChoosePlayerView)

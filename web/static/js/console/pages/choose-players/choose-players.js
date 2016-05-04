import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { PromiseState } from 'react-refetch'

import connect from '../../lib/api'
import { Keys } from '../../lib/key-handler'
import { GameLayout } from '../../layouts'
import {
  Container,
  ErrorPage,
  Menu,
  PlayerContainer
} from '../../components'

export class ChoosePlayers extends Component {

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
        Page(`/games/${createGameResult.value.id}`)
      } else if (createGameResult.rejected) {
        this.setState({error: createGameResult.reason})
      }
    }
  }

  selectPlayer(player, item) {
    this.setState({ [player]: item.user }, () => {
      const { player1, player2 } = this.state
      if (player1 && player2) {
        this.props.createGame([
          { user_id: player1.id, position: 1 },
          { user_id: player2.id, position: 2 }
        ])
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

    const menuItems =
      users
        .map(user => ({ title: user.name, user: user, stateful: true }))
        .concat([{ title: 'Guest', user: { id: null }, stateful: true }])
        .sort((a,b) => a.name - b.name)

    return (
      <GameLayout>
        <PlayerContainer title="Choose Player">
          <Menu
            items={menuItems}
            listens={[Keys.LEFT]}
            onSelect={this.selectPlayer.bind(this, 'player1')}
            onUnSelect={this.unSelectPlayer.bind(this, 'player1')}
          />
        </PlayerContainer>
        <PlayerContainer title="Choose Player">
          <Menu
            items={menuItems}
            listens={[Keys.RIGHT]}
            onSelect={this.selectPlayer.bind(this, 'player2')}
            onUnSelect={this.unSelectPlayer.bind(this, 'player2')}
          />
        </PlayerContainer>
      </GameLayout>
    )
  }
}

export default connect(props => ({
  usersFetch: '/users',
  createGame: players => ({
    createGameResult: {
      url: '/games',
      method: 'POST',
      body: { game: { players: players } }
    }
  })
}))(ChoosePlayers)

import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { Keys } from './lib/key-handler'
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
    // return {
    //   players: Players.find({}, { sort: { name: 1 } }).fetch()
    // };
    // // fetchplayers.then(players => this.setState(isReady: true, players: players))
  }

  componentWillUpdate(_, nextState) {
    const { player1, player2 } = this.state

    if (player1 && player2) {
      //create a new game then
      //Page('game/:id')
    }
  }

  // selectPlayer(player1OrPlayer2, player) {
  //   this[player1OrPlayer2] = player;
  //
  //   if (this.player1 && this.player2) {
  //     Meteor.call("newGame", this.player1, this.player2, (_,gameId) => {
  //       Page(`/game/${gameId}`);
  //     });
  //   }
  // },

  selectPlayer(player, item) {
    this.setState({ [player]: item.player })
  }

  unSelectPlayer(player) {
    this.setState({ [player]: null })
  }

  render() {

    const { players } = this.state

    const menuItems = players.map(player => {
      return { title: player.name, player: player }
    })

    return (
      <div className="game-container">
        <PlayerMenu
          menuItems={menuItems}
          listens={[Keys.Left]}
          onSelect={this.selectPlayer.bind(this, 'player1')}
          onUnSelect={this.unSelectPlayer.bind(this, 'player1')}
          side="left"
        />
        <PlayerMenu
          menuItems={menuItems}
          listens={[Keys.Right]}
          handleSelect={this.selectPlayer.bind(this, 'player2')}
          handleUnSelect={this.unSelectPlayer.bind(this, 'player2')}
          side="right"
        />
      </div>
    )
  }
}

export default ChoosePlayerView

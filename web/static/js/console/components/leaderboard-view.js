import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { Keys } from './lib/key-handler'
import Leaderboard from './leaderboard'

class LeaderboardView extends Component {

  static propTypes = {
    pageSize: PT.number
  };

  static defaultProps = {
    pageSize: 4
  };

  constructor() {
    super()
    this.state = {
      currentPage: 0,
      forceReset: false,
      isReady: false,
      players: []
    }
  }

  componentDidMount() {

    const players = [
      { id: 1, name: 'Dave', taunt: 'mUahahaha', wins: 4, losses: 0},
      { id: 2, name: 'Ryan', taunt: 'old', wins: 1, losses: 3}
    ]

    this.setState(isReady: true, players: players))
  }

  onSelect(item, menu) {

    const { currentPage } = this.state

    switch(item.action) {
      case 'next':
        this.setState({
          currentPage: currentPage + 1,
          forceReset: true
        })
        break

      case 'prev':
        this.setState({
          currentPage: currentPage - 1,
          forceReset: true
        })
        break

      case 'main':
        Page('/main')
        break
      }
    }
  }

  getMenuItems(pageSize, currentPage, players) {

    const menuItems = []

    if (currentPage > 0)
      menuItems.push({ title: "Previous",  action: "prev" })

    if (players.length > (currentPage + 1) * pageSize)
      menuItems.push({ title: "Next",  action: "next" })

    menuItems.push({ title: "Main Menu", action: "main" })

    return menuItems
  }

  getPlayers(pageSize, currentPage, players) {
    return players.splice(currentPage * pageSize, pageSize)
  }

  render() {

    const { pageSize } = this.props
    const { currentPage, forceReset, players } = this.state

    const pagePlayers = this.getPlayers(pageSize, currentPage, players)
    const menuItems = this.getMenuItems(pageSize, currentPage, players)

    return (
      <div>
        <h1 className="leader-board-title">
          <img src="/rocket.png" />Leaders
        </h1>
        <Leaderboard players={pagePlayers} />
        <Menu
          items={menuItems}
          listens={[Keys.Left, Keys.Right]}
          onSelect={::this.onSelect}
          forceReset={forceReset}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    )
  }
}

export default LeaderboardView

import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { Keys } from '../lib/key-handler'
import Api from '../lib/api'
import ErrorPage from './error-page'
import Leaderboard from './leaderboard'
import Menu from './menu'

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
      status: 'pending',
      players: []
    }
  }

  componentDidMount() {

    Api.get('players')
      .then(response =>
        this.setState({ status: 'ready', players: response.data })
      )
      .catch(response => {
        if (response instanceof Error) {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', response.message)
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data)
          console.log(response.status)
          console.log(response.headers)
          console.log(response.config)
        }
        this.setState({ status: 'error', message: response.message })
      })

    // const players = [
    //   { id: 1, name: 'Dave', taunt: 'mUahahaha', wins: 4, losses: 0},
    //   { id: 2, name: 'Ryan', taunt: 'old', wins: 1, losses: 3}
    // ]
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
        Page('/')
        break
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

    const { currentPage, forceReset, isReady, players } = this.state

    const { pageSize } = this.props,
      pagePlayers = this.getPlayers(pageSize, currentPage, players),
      menuItems = this.getMenuItems(pageSize, currentPage, players)

    return (
      <div>
        <h1 className="leader-board-title">
          <img src="/rocket.png" />Leaders
        </h1>
        <Leaderboard players={pagePlayers} />
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
          forceReset={forceReset}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    )
  }
}

export default LeaderboardView

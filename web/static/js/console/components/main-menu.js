import React, { Component } from 'react'
import Page from 'page'
import { Keys } from '../lib/key-handler'
import Menu from './menu'
import MenuItem from './menu-item'

class MainMenu extends Component {

  onSelect(item) {
    if (item.action === 'challenge') {
      // Meteor.call("newGameFromChallenge", item.challenge, (_,gameId) => {
      //   this.transitionTo('/game/' + gameId);
      // });
    } else {
      Page(item.target)
    }
  }

  render() {

    const { ctx: { querystring } } = this.props

    const gameId = querystring && querystring.split('=')[1]

    const menuItems = [
      { title: "Play",    action: 'play',    target: "/game/new" },
      // { title: "Guest",   action: 'guestPlay', target: "game_guest/new" },
      { title: "Leaders", action: 'leaders', target: "/leaders" },
      { title: "Settings", action: 'settings', target: "/settings" }
    ]

    if (gameId) {
      menuItems.push({ title: "Resume Game", action: 'resume', target: `/game/${gameId}` })
    }

    return (
      <div>
        <h1 className="game-name">
          <img src="/images/rocket.png" />PONG
        </h1>
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2016</p>
      </div>
    )
  }
}

export default MainMenu

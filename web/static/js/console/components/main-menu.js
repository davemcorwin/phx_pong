import React, { Component } from 'react'
import Page from 'page'
import { Keys } from './lib/key-handler'
import { Menu, MenuItem } from './components'

class MainMenu extends Component {

  constructor() {
    super()

    this.menuItems = [
      { title: "Play",    action: 'play',    target: "/game/new" },
      { title: "Guest",   action: 'guestPlay', target: "game_guest/new" },
      { title: "Leaders", action: 'leaders', target: "/leaders" }
    ]
  }

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
    return (
      <div>
        <h1 className="game-name" style={{textAlign: 'center'}}>
          <img src="/images/rocket.png" />PONG
        </h1>
        <Menu
          items={this.menuItems}
          listens={[Keys.Left, Keys.Right]}
          onSelect={::this.onSelect}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2016</p>
      </div>
    )
  }
}

export default MainMenu

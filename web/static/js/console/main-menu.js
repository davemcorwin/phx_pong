import React from 'react'
import { Menu, MenuItem } from './components'

const KeyCode = {
  Left: 65,
  Right: 66
}

class MainMenu extends React.Component {

  onSelect(item) {
    // if (item.action === 'challenge') {
    //   Meteor.call("newGameFromChallenge", item.challenge, (_,gameId) => {
    //     this.transitionTo('/game/' + gameId);
    //   });
    // } else {
    //   this.transitionTo(item.target);
    // }
  }

  render() {
    const menuItems = [
      { title: "Play",    action: 'play',    target: "/game/new" },
      { title: "Guest",   action: 'guestPlay', target: "game_guest/new" },
      { title: "Leaders", action: 'leaders', target: "/leaders" }
    ]

    return (
      <div>
        <h1 className="game-name" style={{textAlign: 'center'}}>
          <img src="/images/rocket.png" />PONG
        </h1>
        <Menu
          items={menuItems}
          listens={[KeyCode.Left, KeyCode.Right]}
          onSelect={::this.onSelect}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2016</p>
      </div>
    )
  }
}

export default MainMenu

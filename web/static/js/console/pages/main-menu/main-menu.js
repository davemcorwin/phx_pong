import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'

import { Keys }           from '../../lib/key-handler'
import { Menu, MenuItem } from '../../components'
import { MenuLayout }     from '../../layouts'

export default class MainMenu extends Component {

  static propTypes = {
    gameId: PT.string
  };

  onSelect(item) {
    if (item.action === 'challenge') {
      // Meteor.call("newGameFromChallenge", item.challenge, (_,gameId) => {
      //   this.transitionTo('' + gameId);
      // });
    } else {
      Page(item.target)
    }
  }

  render() {

    const { gameId } = this.props

    const menuItems = [
      { title: "Play",     action: 'play',     target: "" },
      { title: "Leaders",  action: 'leaders',  target: "/leaders" },
      { title: "Settings", action: 'settings', target: "/settings" }
    ]

    if (gameId) {
      menuItems.push({ title: "Resume Game", action: 'resume', target: `/games/${gameId}` })
    }

    return (
      <MenuLayout title="PONG">
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </MenuLayout>
    )
  }
}

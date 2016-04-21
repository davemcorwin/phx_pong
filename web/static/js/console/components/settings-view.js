import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { Keys } from '../lib/key-handler'
import Settings from '../lib/settings'
import Menu from './menu'

class SettingsView extends Component {

  constructor() {
    super()
    this.state = { forceReset: false }
  }

  onSelect(item) {

    switch(item.action) {
      case 'nba':
        Settings.nbaJamMode = !Settings.nbaJamMode
        this.setState({forceReset: true})
        break
      case 'main':
        Page('/')
        break
    }
  }

  render() {
    const menuItems = [
      { label: 'NBA Jam Mode', title: Settings.nbaJamMode ? 'on' : 'off',  action: 'nba' },
      { title: 'Main Menu',  action: 'main' }
    ]

    return (
      <div>
        <h1 className="leader-board-title">
          <img src="/images/rocket.png" />Settings
        </h1>
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
          forceReset={this.state.forceReset}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    )
  }
}

export default SettingsView

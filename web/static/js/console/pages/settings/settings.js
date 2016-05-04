import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'

import { Keys }       from '../../lib/key-handler'
import { Menu }       from '../../components'
import { MenuLayout } from '../../layouts'

export default class Settings extends Component {

  static contextTypes = {
    nbaJamMode: PT.bool.isRequired
  };

  static propTypes = {
    update: PT.func.isRequired
  };

  onSelect(item) {

    switch(item.action) {
      case 'nba':
        this.props.update({ nbaJamMode: !this.context.nbaJamMode })
        break
      case 'main':
        Page('/')
        break
    }
  }

  render() {
    const menuItems = [
      { label: 'NBA Jam Mode', title: this.context.nbaJamMode ? 'on' : 'off',  action: 'nba' },
      { title: 'Main Menu',  action: 'main' }
    ]

    return (
      <MenuLayout title="Settings">
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </MenuLayout>
    )
  }
}

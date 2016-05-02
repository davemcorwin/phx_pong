import React, { Component, PropTypes as PT } from 'react'

import Api      from '../../lib/api'
import { Keys } from '../../lib/key-handler'
import { GameMessage, Menu } from '../../components'
import { Game } from '../../types'

export default class ServingMenu extends Component {

  static propTypes = {
    game: Game.isRequired,
    onChoose: PT.func.isRequired
  };

  onSelect(item) {
    this.props.onChoose({first_server: item.id})
  }

  render() {

    const { game: { player1, player2 } } = this.props

    const menuItems = [
      { title: player1.name, id: player1.id },
      { title: player2.name, id: player2.id }
    ]

    return (
      <GameMessage messages={['Who serves first?']}>
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={::this.onSelect}
        />
      </GameMessage>
    )
  }
}

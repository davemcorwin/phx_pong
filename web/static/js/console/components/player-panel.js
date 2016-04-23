import React, { Component, PropTypes as PT } from 'react'
import KeyHandler, { Events, Keys } from '../lib/key-handler'
import { Player } from '../types'

class PlayerPanel extends Component {

  static propTypes = {
    isServer:     PT.bool.isRequired,
    key:          PT.number.isRequired,
    onScore:      PT.func.isRequired,
    player:       Player.isRequired,
    playerStatus: PT.string.isRequired,
  };

  constructor() {
    super()

    this.sounds = {
      'heating-up': new Audio('/sounds/heating-up.m4a'),
      'on-fire': new Audio('/sounds/on-fire.m4a')
    }
  }

  componentDidMount() {
    this.keyHandler = KeyHandler.addListener(key, ::this.handleKey)
  }

  componentWillUnmount() {
    KeyHandler.removeListener(this.keyHandler)
  }

  componentWillReceiveProps({playerStatus}) {
    if (playerStatus !== this.props.playerStatus) {
      const sound = this.sounds[playerStatus]
      if (sound) sound.play()
    }
  }

  handleKey(event, key) {

    switch(event) {

      case Events.HOLD:
        Page('/')
        break

      case Events.TAP:
        this.props.onScore()
    }
  }

  render() {

    const { isServer, player, playerStatus } = this.props

    return (
      <div className={`player-container ${playerStatus}`}>
        <p className="player-name">{player.name || 'Unknown'}</p>
        <h1 className="score">{player.score}</h1>
        { isServer ? <span className="serving-message">Serving</span> : null }
        <img src="/images/flame.gif" className="flames"/>
      </div>
    )
  }
}

export default PlayerPanel

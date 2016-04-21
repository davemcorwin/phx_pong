import React, { Component, PropTypes as PT } from 'react'
import Classnames from 'classnames'

class PlayerScore extends Component {

  static propTypes = {
    isServing:  PT.bool.isRequired,
    playerName: PT.string,
    score:      PT.number.isRequired,
    status:     PT.string.isRequired
  };

  static defaultProps = {
    playerName: 'Unknown'
  };

  constructor() {
    super()

    this.heatingUp = new Audio('/sounds/heating-up.m4a')
    this.onFire = new Audio('/sounds/on-fire.m4a')
  }

  componentWillReceiveProps({status}) {
    if (status === 'heating-up')
      this.heatingUp.play()
    else if (status === 'on-fire' && this.props.status !=='on-fire')
      this.onFire.play()
  }

  render() {

    const
      { isServing, playerName, score, status } = this.props,
      classes = Classnames('player-container', {
        'heating-up': status === 'heating-up',
        'on-fire':    status === 'on-fire',
      })

    return (
      <div className={classes}>
        <p className="player-name">{playerName}</p>
        <h1 className="score">{score}</h1>
        { isServing ? <span className="serving-message">Serving</span> : null }
        <img src="/images/flame.gif" className="flames"/>
      </div>
    )
  }
}

export default PlayerScore

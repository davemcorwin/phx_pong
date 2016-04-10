import React, { Component } from 'react'
import Page from 'page'

import KeyHandler from './lib/key-handler'

import * from './components'

const FourOhFour = () => <h1>404 son!</h1>

class Console extends Component {

  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    KeyHandler.register(window)

    const r = component => ctx => this.setState({ component: component })

    Page('/',                             r(<MainMenu />))
    Page('/leaders',                      r(<LeaderboardView />))
    Page('/game/new',                     r(<ChoosePlayerView />))
    Page('/game/:id',                     r(<GameView />))
    // Page('/game_guest/new',               r(<GuestServingMenu />))
    // Page('/game_guest/play/:firstServer', r(<GuestPlay />))

    Page('*', r(<FourOhFour />))

    Page.start()
  }


  componentWillUnmount() {
    KeyHandler.unregister()
  }

  render() {
    return this.state.component
  }
}

export default Console

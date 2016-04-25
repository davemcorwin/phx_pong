import React, { Component } from 'react'
import Page from 'page'

import KeyHandler from './lib/key-handler'

import {
  ChoosePlayerView,
  GameView,
  LeaderboardView,
  SettingsView,
  MainMenu } from './components'

const FourOhFour = () => <h1>404 son!</h1>

class Console extends Component {

  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    KeyHandler.register(window)

    Page('/',                             ctx => this.setState({ component: <MainMenu gameId={localStorage.gameId}/>}))
    Page('/leaders',                      ctx => this.setState({ component: <LeaderboardView />}))
    Page('/settings',                     ctx => this.setState({ component: <SettingsView />}))
    Page('/game/new',                     ctx => this.setState({ component: <ChoosePlayerView />}))
    Page('/game/:id',                     ctx => this.setState({ component: <GameView gameId={ctx.params.id} ctx={ctx}/>}))
    // Page('/game_guest/new',               ctx => this.setState({ component: <GuestServingMenu />}))
    // Page('/game_guest/play/:firstServer', ctx => this.setState({ component: <GuestPlay />}))

    Page('*', ctx => this.setState({ component: <FourOhFour />}))

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

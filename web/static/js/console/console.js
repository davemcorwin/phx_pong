import React, { Component } from 'react'
import Page from 'page'

import KeyHandler from './lib/key-handler'

import {
  ChoosePlayerView,
  GameView,
  LeaderboardView,
  SettingsView,
  MainMenu } from './components'

import { FourOhFourView } from './views'

class Console extends Component {

  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    KeyHandler.register(window)

    Page('/',         ctx => this.setState({ component: <MainMenu gameId={localStorage.gameId}/>}))
    Page('/leaders',  ctx => this.setState({ component: <LeaderboardView />}))
    Page('/settings', ctx => this.setState({ component: <SettingsView />}))
    Page('/game/new', ctx => this.setState({ component: <ChoosePlayerView />}))
    Page('/game/:id', ctx => this.setState({ component: <GameView gameId={ctx.params.id} />}))
    Page('*',         ctx => this.setState({ component: <FourOhFourView />}))

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

import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'

import KeyHandler from './lib/key-handler'
import {
  ChoosePlayers,
  FourOhFour,
  Games,
  Leaders,
  MainMenu,
  Settings
} from './pages'

export default class Console extends Component {

  static childContextTypes = {
    nbaJamMode: PT.bool
  };

  updateSettings(settings) {
    this.setState(settings, () => localStorage.nbaJamMode = this.state.nbaJamMode)
  }

  constructor() {
    super()
    this.state = { component: <div /> }
  }

  getChildContext() {
    return { nbaJamMode: this.state.nbaJamMode }
  }

  componentDidMount() {

    KeyHandler.register(window)

    Page('/',               ctx => this.setState({ component: <MainMenu gameId={localStorage.gameId}/>}))
    Page('/leaders',        ctx => this.setState({ component: <Leaders />}))
    Page('/settings',       ctx => this.setState({ component: <Settings update={::this.updateSettings}/>}))
    Page('/choose-players', ctx => this.setState({ component: <ChoosePlayers />}))
    Page('/games/:id',      ctx => this.setState({ component: <Games gameId={ctx.params.id} />}))
    Page('*',               ctx => this.setState({ component: <FourOhFour />}))

    this.setState({nbaJamMode: localStorage.nbaJamMode === "true"})

    Page.start()
  }

  componentWillUnmount() {
    KeyHandler.unregister()
  }

  render() {
    return this.state.component
  }
}

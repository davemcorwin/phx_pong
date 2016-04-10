import React from 'react'
import Page from 'page'
import MainMenu from './main-menu'
import LeaderboardView from './leaderboard-view'

const FourOhFour = () => <h1>404 son!</h1>

class Console extends React.Component {
  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    const r = component => ctx => this.setState({ component: component })

    Page('/',                             r(<MainMenu />))
    Page('/leaders',                      r(<LeaderboardView />))
    Page('/game/new',                     r(<ChoosePlayerMenu />))
    Page('/game_guest/new',               r(<GuestServingMenu />))
    Page('/game/:id',                     r(<ServingMenu />))
    Page('/game/:id/play',                r(<Play />))
    Page('/game_guest/play/:firstServer', r(<GuestPlay />))

    Page('*', r(<FourOhFour />))

    Page.start()
  }

  render() {
    return this.state.component
  }
}

export default Console

import React from 'react'
import Page from 'page'
import MainMenu from './main-menu'

const FourOhFour = () => <h1>404 son!</h1>

class Console extends React.Component {
  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    Page('/', ctx =>
      this.setState({ component: <MainMenu /> })
    )

    Page('*', ctx =>
      this.setState({ component: <FourOhFour /> })
    )

    Page.start()
  }

  render() {
    return this.state.component
  }
}

export default Console

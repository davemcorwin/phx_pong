import React, { Component, PropTypes as PT } from 'react'
import Page from 'page'
import { PromiseState } from 'react-refetch'

import connect from '../../lib/api'
import Paginator from '../../lib/paginator'
import { Keys } from '../../lib/key-handler'

import { Container, Menu } from '../../components'
import { MenuLayout } from '../../layouts'

import Leaderboard from './leaderboard'

class Leaders extends Component {

  static propTypes = {
    usersFetch: PT.instanceOf(PromiseState).isRequired,
  };

  onSelect(paginator, item) {

    switch(item.action) {
      case 'next':
        paginator.next()
        break

      case 'prev':
        paginator.previous()
        break

      case 'main':
        Page('/')
        break
    }
  }

  render() {
    return <Container ps={this.props.usersFetch} onFulfillment={::this.view} />
  }

  view(users) {

    const paginator = new Paginator(users)

    const menuItems = [{ title: "Main Menu", action: "main" }]

    if (!paginator.isLastPage())
      menuItems.unshift({ title: "Next",  action: "next" })

    if (!paginator.isFirstPage())
      menuItems.unshift({ title: "Previous",  action: "prev" })

    return (
      <MenuLayout title="Leaders">
        <Leaderboard users={paginator.page()} />
        <Menu
          items={menuItems}
          listens={[Keys.LEFT, Keys.RIGHT]}
          onSelect={this.onSelect.bind(this, paginator)}
        />
      </MenuLayout>
    )
  }
}

export default connect(props => ({
  usersFetch: '/users'
}))(Leaders)

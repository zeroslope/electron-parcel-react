import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Record from './pages/record'
import Setting from './pages/setting'

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/record' component={Record} />
      <Route exact path='/setting' component={Setting} />
      <Route component={() => <h1>204 No Content</h1>} />
    </Switch>
  )
}

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SearchPage from './pages/SearchPage'

const App = () => (
  <Switch>
    <Route path='/' exact component={SearchPage} />
  </Switch>
)

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import '../assets/less/antd-custom.less'
import 'tachyons/css/tachyons.css'
import '../assets/css/style.css'

import App from './App'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)

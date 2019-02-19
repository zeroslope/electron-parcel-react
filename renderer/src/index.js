// import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter, Route } from 'react-router-dom'
// import '../assets/less/antd-custom.less'
// import 'tachyons/css/tachyons.css'
// import '../assets/css/style.css'
// import App from './App'

// ReactDOM.render(
//   <BrowserRouter>
//     <Route component={App} />
//   </BrowserRouter>
//   ,
//   document.getElementById('root')
// )

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Router from './router'

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Router)

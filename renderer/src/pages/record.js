import React, { Component } from 'react'
import Layout from '../components/Layout'

class Record extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>历史记录</h2>
      </Layout>
    )
  }
}

export default Record

import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Button, Input } from 'antd'

const Text = ({ children }) => (
  <span className='f6'>{children}</span>
)

class Setting extends Component {
  state = {
    certificate: '',
    password: '',
    isDisabled: true
  }

  componentDidMount () {
    let { certificate, password } = window.localStorage
    certificate = certificate || ''
    password = password || ''
    this.setState({
      certificate,
      password,
      isDisabled: (!!certificate && !!password)
    })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {}

  save = () => {
    window.localStorage.certificate = this.state.certificate
    window.localStorage.password = this.state.password
    this.setState({ isDisabled: true })
  }

  edit = () => {
    this.setState({ isDisabled: false })
  }

  render () {
    const { certificate, password, isDisabled } = this.state
    return (
      <Layout match={this.props.match}>
        <section className='relative overflow-hidden'>
          <div className='pa3'>
            <h2 className='silver'>代理设置</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <Text>通行证书</Text>
                <Input size='small' className='db mt1 w-10' value={certificate} name='certificate'
                  disabled={isDisabled}
                  onChange={this.handleChange}
                />
              </div>
              <div className='mt2'>
                <Text>通行密钥</Text>
                <Input size='small' className='db mt1 w-10' value={password} name='password'
                  disabled={isDisabled}
                  onChange={this.handleChange}
                />
              </div>
              <div className='mt3'>
                <Button size='small'
                  type='primary'
                  className='f7'
                  disabled={isDisabled}
                  onClick={this.save}>
                保存
                </Button>
                <Button size='small'
                  type='primary'
                  className='f7 ml3'
                  disabled={!isDisabled}
                  onClick={this.edit}>
                编辑
                </Button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Setting

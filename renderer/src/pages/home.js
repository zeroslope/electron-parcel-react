/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line
import { Select, Switch, Input, InputNumber, Tabs, Button } from 'antd'

const Option = Select.Option
const TabPane = Tabs.TabPane

const Text = ({ children }) => (
  <span className='f7'>{children}</span>
)

// const w10 = css({
//   width: '10rem'
// })

class UserTab extends Component {
  ipcRenderer = window.electron.ipcRenderer || false
  state = {
    username: '',
    userId: '',
    pageNumber: 1,
    isNeedImage: false
  }

  componentDidMount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.on('search-by-user', (event, data) => {
        window.alert(data)
      })
    }
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-user')
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handlePageNumberChange = val => this.setState({ pageNumber: val })

  handleImageSwitch = (checked, e) => this.setState({ isNeedImage: checked })

  handleSubmit = () => {
    if (this.ipcRenderer) {
      const { username, userId, pageNumber, isNeedImage } = this.state
      this.ipcRenderer.send('search-by-user', {
        type: '1',
        username,
        userId,
        pageNumber,
        isNeedImage
      })
    }
  }

  render () {
    let { username, userId, pageNumber, isNeedImage } = this.state
    return (
      <div className='pv2 ph3'>
        <h2 className='silver'>基于用户ID搜索</h2>
        {/** 第一位：type = 1 第二位：用户名  第三位：用户id 第四位：爬取页码 第五位：是否要图片 */}
        <div>
          <div>
            <Text>用户名</Text>
            <Input size='small' className='db mt1 w-10' value={username} name='username' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>用户ID</Text>
            <Input size='small' className='db mt1 w-10' value={userId} name='userId' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>爬取页码</Text>
            <InputNumber size='small' className='db mt1' value={pageNumber} onChange={this.handlePageNumberChange} />
          </div>
          <div className='mt2'>
            <Text>是否爬取图片</Text>
            <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' checked={isNeedImage} onChange={this.handleImageSwitch} />
          </div>
          <Button size='small'
            className='ba mt3 ph2 f7 white link bg-animate bg-transparent hover-black hover-bg-white b'
            onClick={this.handleSubmit}
          >
              提交
          </Button>
        </div>
      </div>
    )
  }
}

class KeywordTab extends Component {
  ipcRenderer = window.electron.ipcRenderer || false
  state = {
    pageNumber: 1,
    keyWord: '',
    searchOption: '1',
    isNeedImage: false
  }

  componentDidMount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.on('search-by-keyword', (event, data) => {
        window.alert(data)
      })
    }
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-keyword')
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSearchChange = val => this.setState({ searchOption: val })

  handlePageNumberChange = val => this.setState({ pageNumber: val })

  handleImageSwitch = (checked, e) => this.setState({ isNeedImage: checked })

  handleSubmit = () => {
    if (this.ipcRenderer) {
      const { pageNumber, keyWord, isNeedImage, searchOption } = this.state
      this.ipcRenderer.send('search-by-keyword', {
        type: '2',
        pageNumber,
        keyWord,
        isNeedImage,
        searchOption
      })
    }
  }

  render () {
    const { pageNumber, keyWord, isNeedImage, searchOption } = this.state
    return (
      <div className='pv2 ph3'>
        <h2 className='silver'>基于关键词搜索</h2>
        {/** 第一位：type = 2   第二位：关键词    第三位：1-综合 60-热门 61-实时  第四位：页码 第五位：是否要图片 */}
        <div>
          <div>
            <Text className='f6'>关键词</Text>
            <Input size='small' className='db mt1 w-10' value={keyWord} name='keyWord' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>搜索方式</Text>
            <Select size='small' defaultValue='1' value={searchOption} className='db mt1 f7' style={{ width: 120 }} onChange={this.handleSearchChange}>
              <Option value='1'>综合</Option>
              <Option value='60'>热门</Option>
              <Option value='61'>实时</Option>
            </Select>
          </div>
          <div className='mt2'>
            <Text>爬取页码</Text>
            <InputNumber size='small' className='db mt1' value={pageNumber} onChange={this.handlePageNumberChange} />
          </div>
          <div className='mt2'>
            <Text>是否爬取图片</Text>
            <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' checked={isNeedImage} onChange={this.handleImageSwitch} />
          </div>
          <Button size='small'
            className='ba mt3 ph2 f7 white link bg-animate bg-transparent hover-black hover-bg-white b'
            onClick={this.handleSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>数据爬取</h2>
        <section className='relative overflow-hidden' css={{
          paddingTop: '1rem'
        }}>
          <Tabs tabPosition='left' className='pt3'>
            <TabPane tab='基于用户ID搜索' key='1'>
              <UserTab />
            </TabPane>
            <TabPane tab='基于关键词搜索' key='2'>
              <KeywordTab />
            </TabPane>
          </Tabs>
        </section>
      </Layout>
    )
  }
}

export default Index

const { exec } = require('child_process')
const { join } = require('path')
const { format } = require('url')
const { resolve } = require('app-root-path')
const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')

// const path = require('path')
// const url = require('url')

ipcMain.on('search-by-keyword', (event, arg) => {
  const { type, keyWord, searchOption, pageNumber, isNeedImage } = arg
  const cmd = `scrapy crawl weibo -a line=${type},${keyWord},${searchOption},${pageNumber},${isNeedImage ? 'True' : 'False'}@_@`
  // console.log(cmd)
  event.sender.send('search-by-keyword', cmd)
  let venv = join(process.cwd(), '../venv/bin/activate')
  // console.log(venv)
  exec(`source ${venv} && cd ../weibo_scrapy && ${cmd}`, function (err, stdout, stderr) {
    // console.log(stdout)
    event.sender.send('search-by-keyword', stdout.length)
    if (err) {
      console.info('stderr : ' + stderr)
    }
  })
})

ipcMain.on('search-by-user', (event, arg) => {
  const { type, username, userId, pageNumber, isNeedImage } = arg
  const cmd = `scrapy crawl weibo -a line=${type},${username},${userId},${pageNumber},${isNeedImage ? 'True' : 'False'}@_@`
  // event.sender.send('search-by-user', cmd)
  let venv = join(process.cwd(), '../venv/bin/activate')
  exec(`source ${venv} && cd ../weibo_scrapy && ${cmd}`, function (err, stdout, stderr) {
    console.log(stdout)
    event.sender.send('search-by-user', stdout.length)
    if (err) {
      console.info('stderr : ' + stderr)
    }
  })
})

ipcMain.on('change-proxy', (event, arg) => {
  const { certificate, password } = arg
  const cmd = `python modify_proxy.py ${certificate} ${password}`
  let venv = join(process.cwd(), '../venv/bin/activate')
  exec(`source ${venv} && cd ../weibo_scrapy && ${cmd}`, function (err, stdout, stderr) {
    console.log(stdout)
    event.sender.send('search-by-user', stdout.length)
    if (err) {
      console.info('stderr : ' + stderr)
    }
  })
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  const { screen } = require('electron')
  const { bounds } = screen.getPrimaryDisplay()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: bounds.width * 0.8,
    height: bounds.height * 0.8,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: join(__dirname, 'preload.js')
    }
  })

  const devPath = 'http://localhost:1234'

  const prodPath = format({
    pathname: resolve('app/index.html'),
    protocol: 'file:',
    slashes: true
  })

  // console.log(process.env.NODE_ENV)

  let isDevEnv = isDev && process.env.NODE_ENV !== 'production'

  const url = isDevEnv ? devPath : prodPath

  console.log(url)

  // and load the index.html of the app.
  mainWindow.loadURL(url)

  console.log('hello')

  // Open the DevTools.
  // if (isDev)
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

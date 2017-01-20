const {app, BrowserWindow, Menu, shell} = require('electron')
const path = require('path')
const url = require('url')

let window

app.once('ready', () => {
  window = new BrowserWindow()
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu')))
})

app.on('web-contents-created', (event, contents) => {
  contents.on('context-menu', (event, {linkURL, x, y}) => {
    const target = contents.hostWebContents
    if (target == null) return

    const contextTemplate = [{
      label: 'Toggle Dev Tools',
      click: () => contents.toggleDevTools()
    }]

    if (linkURL) {
      contextTemplate.push({
        label: 'Open Externally',
        click: () => shell.openExternal(linkURL),
      })
    }

    const menu = Menu.buildFromTemplate(contextTemplate)
    const window = BrowserWindow.fromWebContents(contents.hostWebContents)
    menu.popup(window, x, y)
  })

  if (contents.session != null) {
    // Reject permission requests
    contents.session.setPermissionRequestHandler((webContents, permission, callback) => {
      callback(false)
    })
  }
})

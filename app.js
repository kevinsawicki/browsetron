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
})

app.on('web-contents-created', (event, contents) => {
  contents.on('context-menu', (event, {linkURL, x, y}) => {
    const target = contents.hostWebContents
    if (target == null) return

    const template = [{
      label: 'Toggle Dev Tools',
      click: () => contents.toggleDevTools()
    }]

    if (linkURL) {
      template.push({
        label: 'Open Externally',
        click: () => shell.openExternal(linkURL),
      })
    }

    const menu = Menu.buildFromTemplate(template)
    const window = BrowserWindow.fromWebContents(contents.hostWebContents)
    menu.popup(window, x, y)
  })

  if (contents.session != null) {
    // Reject remove permissions
    contents.session.setPermissionRequestHandler((webContents, permission, callback) => {
      callback(false)
    })
  }
})

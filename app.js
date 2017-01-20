const {app, BrowserWindow} = require('electron')
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

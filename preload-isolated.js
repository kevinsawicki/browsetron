const fs = require('fs')
const path = require('path')
const {shell, webFrame} = require('electron')

const preloadRemotePath = path.join(__dirname, 'preload-remote.js')
webFrame.executeJavaScript(fs.readFileSync(preloadRemotePath, 'utf8'))

window.addEventListener('message', ({data}) => {
  if (data === 'browsetron-beep') {
    shell.beep()
  }
})

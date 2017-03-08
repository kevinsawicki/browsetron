window.addEventListener('DOMContentLoaded', () => {
  const back = document.querySelector('.back-button')
  const forward = document.querySelector('.forward-button')
  const reload = document.querySelector('.reload-button')
  const stop = document.querySelector('.stop-button')
  const address = document.querySelector('.address-input')

  const webview = document.querySelector('webview')

  webview.addEventListener('dom-ready', () => {
    const contents = webview.getWebContents()

    // Listen for button clicks
    back.addEventListener('click', () => contents.goBack())
    forward.addEventListener('click', () => contents.goForward())
    reload.addEventListener('click', () => contents.reload())
    stop.addEventListener('click', () => contents.stop())

    // Update address bar when page URL changes
    contents.on('did-navigate', (event, url) => {
      address.value = url
    })
    contents.on('did-navigate-in-page', (event, url) => {
      address.value = url
    })

    address.addEventListener('keyup', (event) => {
      // Load URL when enter is pressed
      if (event.keyCode === 13) {
        contents.loadURL(address.value)
      }
    })
  }, {once: true})
})

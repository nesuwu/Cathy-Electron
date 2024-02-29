const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    // Set the application icon
    icon: path.join(__dirname, 'images/icon.png')
  })

  win.loadFile('src/index.html')

  // Hide the default menu bar
  win.setMenuBarVisibility(false)

  // Maximize the window
  win.maximize()
}

app.whenReady().then(createWindow)
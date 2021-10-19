// import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow, session } = require('electron');
const isDev = require('electron-is-dev');
// const url = require('url') 
const path = require('path')
const os = require('os') 
const {ipcMain} = require('electron') 


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      // 'http://localhost:3000'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
      // `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
    // win.webContents.once("dom-ready", async () => {
    //   await installExtension([REDUX_DEVTOOLS])
    //       .then((name) => console.log(`Added Extension:  ${name}`))
    //       .catch((err) => console.log("An error occurred: ", err))
    //       .finally(() => {
    //         win.webContents.openDevTools({ mode: 'detach' });
    //       });
    // });
  }
}

ipcMain.on('saveFile', (event, path) => { 
  const {dialog} = require('electron') 
  const fs = require('fs') 
  console.log("=== path = ", path)

  const options = {
    defaultPath: app.getPath('documents') + '/electron-tutorial-app.csv',
    filters: [
      { name: 'CSV file', extensions: ['csv'] },
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
      { name: 'Custom File Type', extensions: ['as'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    buttonLabel: 'Export',
  }
  
  dialog.showSaveDialog(null, options).then(
    res => {
      console.log(res);
      event.reply('saveFile-reply', res)
    }
  )
  
}) 

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const reactDevToolsPath = "C:\\Users\\Mickey\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd"

app.whenReady().then(
  // createWindow
  // async () => {
  //   // await session.defaultSession.loadExtension(reactDevToolsPath)
  //   try {
  //     await installExtension(REDUX_DEVTOOLS)
  //   } catch (e) {
  //       console.error("Vue Devtools failed to install:", e.toString())
  //     }
  // },
  createWindow
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on('ready', () => {
//   installExtension(REDUX_DEVTOOLS)
//       .then((name) => console.log(`Added Extension: ${name}`))
//       .catch((err) => console.log('An error occurred: ', err));
// });
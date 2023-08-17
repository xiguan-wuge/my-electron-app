// 为了管理应用程序的生命周期事件以及创建和控制浏览器窗口，您从 electron 包导入了 app 和 BrowserWindow 模块 。
const { app, BrowserWindow, ipcMain } = require('electron')
 // 导入 path 包，该包为操作文件路径提供了实用的功能。
const path = require('path')
// 在此之后，你定义一个方法用来创建一个带有预加载脚本的新的浏览器窗口，并加载index.html文件进入该窗口 
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 你通过调用 createWindow方法，在 electron app 第一次被初始化时创建了一个新的窗口。
  // mainWindow.loadFile('index.html')
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))


  // 打开开发工具
  mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
  console.log('app.whenReady')
  ipcMain.handle('ping', () => 'pong')
  createWindow()
// 您添加一个新的侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后或重启运行中的应用程序
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// 您添加了一个新的侦听器，当应用程序不再有任何打开窗口时试图退出。 由于操作系统的 窗口管理行为 ，此监听器在 macOS 上是禁止操作的
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

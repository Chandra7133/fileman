const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const fileHandler = require('./file-handler');
const CURD = require('./file-curd');
function createWindow() {
 const win = new BrowserWindow({
  width: 900,
  height: 500,
  webPreferences: {
   preload: path.join(__dirname, 'preload.js'),
   contextIsolation: true,
   nodeIntegration: false,
  }
 });
 win.loadFile(path.join(__dirname, 'dist/fileman/index.html'));
 // win.webContents.openDevTools();
}
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.whenReady().then(() => {
 fileHandler();
 createWindow();
});
ipcMain.handle('create-folder', async (event, folderPath) => { return await CURD.createFolder(folderPath); });
ipcMain.handle('create-file', async (event, path) => { return await CURD.createFile(path); });
ipcMain.handle('read-file', (event, filePath) => CURD.readTextFile(filePath));
ipcMain.handle('write-file', (event, filePath, content) => CURD.writeTextFile(filePath, content));

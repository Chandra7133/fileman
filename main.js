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
ipcMain.handle('read-text-file', (event, path) => CURD.readTextFile(path));
ipcMain.handle('write-text-file', (event, path, content) => CURD.writeTextFile(path, content));
ipcMain.handle('read-excel-file', (event, path) => CURD.readExcelData(path));
ipcMain.handle('create-excel-record', (event, path, content) => CURD.createExcelRecord(path, content));
ipcMain.handle('update-excel-record', (event, path, id, content) => CURD.updateExcelRecord(path, id, content));
ipcMain.handle('remove-excel-record', (event, path, id) => CURD.removeExcelRecord(path, id));


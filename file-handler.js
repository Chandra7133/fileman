const { ipcMain } = require('electron');
const { execFile } = require('child_process');
const path = require('path');
function registerFileHandler() {
 if (!ipcMain.eventNames().includes('lists')) {
  ipcMain.handle('lists', async (event, dirPath) => {
   return new Promise((resolve) => {
    execFile('ls', ['-p', dirPath], { encoding: 'utf8' }, (error, stdout, stderr) => {
     if (error) {
      console.error('LS Error:', error.message);
      return resolve({ folders: [], files: [] });
     }
     const items = stdout.split('\n').filter(Boolean);
     const folders = [];
     const files = [];
     for (const item of items) {
      if (item.endsWith('/')) folders.push(item.slice(0, -1));
      else files.push(item);
     }
     resolve({ folders, files });
    });
   });
  });
 }
}
module.exports = registerFileHandler;

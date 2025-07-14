const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileAPI', {
 listFoldersAndFiles: (dirPath) => ipcRenderer.invoke('lists', dirPath),
 createFolder: (dirPath) => ipcRenderer.invoke('create-folder', dirPath),
 createFile: (dirPath) => ipcRenderer.invoke('create-file', dirPath),
 readTextFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
 writeTextFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
});

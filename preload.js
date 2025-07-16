const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileAPI', {
 listFoldersAndFiles: (dirPath) => ipcRenderer.invoke('lists', dirPath),
 createFolder: (dirPath) => ipcRenderer.invoke('create-folder', dirPath),
 createFile: (dirPath) => ipcRenderer.invoke('create-file', dirPath),
 readTextFile: (path) => ipcRenderer.invoke('read-text-file', path),
 writeTextFile: (path, content) => ipcRenderer.invoke('write-text-file', path, content),
 readExcelData: (path) => ipcRenderer.invoke('read-excel-file', path),
 createExcelRecord: (path, content) => ipcRenderer.invoke('create-excel-record', path, content),
 updateExcelRecord: (path, id, content) => ipcRenderer.invoke('update-excel-record', path, id, content),
 removeExcelRecord: (path, id) => ipcRenderer.invoke('remove-excel-record', path, id),
});

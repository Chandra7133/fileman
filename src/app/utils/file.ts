import { Injectable } from '@angular/core';
declare global {
 interface Window {
  fileAPI: {
   listFoldersAndFiles: (dirPath: string) => Promise<{ folders: string[], files: string[] }>;
   createFolder: (dirPath: string) => Promise<boolean>;
   createFile: (dirPath: string) => Promise<boolean>;
   readTextFile: (dirPath: string) => Promise<string>;
   writeTextFile: (path: string, content: string) => Promise<boolean>;
  };
 }
}
@Injectable({
 providedIn: 'root'
})

export class File {
 listFoldersAndFiles(dirPath: string) {
  return window.fileAPI.listFoldersAndFiles(dirPath);
 }

 createFolder(path: string): Promise<boolean> {
  return window.fileAPI.createFolder(path);
 }

 createFile(path: string): Promise<boolean> {
  return window.fileAPI.createFile(path);
 }

 readFile(path: string): Promise<string> {
  return window.fileAPI.readTextFile(path);
 }

 writeFile(path: string, content: string): Promise<boolean> {
  return window.fileAPI.writeTextFile(path, content);
 }
}

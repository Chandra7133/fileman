import { Injectable } from '@angular/core';

declare global {
 interface Window {
  fileAPI: {
   listFoldersAndFiles: (dirPath: string) => Promise<{ folders: string[], files: string[] }>;
   createFolder: (dirPath: string) => Promise<boolean>;
   createFile: (dirPath: string) => Promise<boolean>;
   readTextFile: (path: string) => Promise<string>;
   writeTextFile: (path: string, content: string) => Promise<boolean>;
   readExcelData: (path: string) => Promise<any[]>;
   createExcelRecord: (path: string, record: any) => Promise<any>;
   updateExcelRecord: (path: string, id: number, record: any) => Promise<any>;
   removeExcelRecord: (path: string, id: number) => Promise<boolean>;
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

 readTextFile(path: string): Promise<string> {
  return window.fileAPI.readTextFile(path);
 }

 writeTextFile(path: string, content: string): Promise<boolean> {
  return window.fileAPI.writeTextFile(path, content);
 }

 readExcel(path: string): Promise<any[]> {
  return window.fileAPI.readExcelData(path);
 }

 createExcelRecord(path: string, record: any): Promise<any> {
  return window.fileAPI.createExcelRecord(path, record);
 }

 updateExcelRecord(path: string, id: number, record: any): Promise<any> {
  return window.fileAPI.updateExcelRecord(path, id, record);
 }

 removeExcelRecord(path: string, id: number): Promise<boolean> {
  return window.fileAPI.removeExcelRecord(path, id);
 }
}

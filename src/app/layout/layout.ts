import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { File } from '../utils/file';
import { Router } from "@angular/router"
import { ChangeDetectorRef } from '@angular/core';
@Component({
 selector: 'app-layout',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './layout.html',
})
export class Layout implements OnInit {
 directoryPath = '/home';
 folderList: string[] = [];
 fileList: string[] = [];
 selectedFolder: string = '';
 selectedFile: string = '';
 showAddFolder: boolean = false;
 newFolderName = '';
 showAddFile = false;
 newFileName = '';
 selectedExtension = '.txt';
 private readonly file = inject(File)
 private readonly router = inject(Router)
 private readonly cd = inject(ChangeDetectorRef)
 ngOnInit(): void {
  const dir = localStorage.getItem("directory") || ""
  if (dir) {
   this.directoryPath = dir;
  }
  this.loadDirectory(this.directoryPath);
 }

 goUp() {
  const parts = this.directoryPath.split('/');
  if (parts.length > 1) {
   parts.pop(); // remove current folder
   this.directoryPath = parts.join('/') || '/';
   this.loadDirectory(this.directoryPath);
  }
 }

 addFolder() {
  const folderPath = `${this.directoryPath}/${this.newFolderName}`;
  if (!this.newFolderName.trim()) return;
  this.file.createFolder(folderPath).then(success => {
   if (success) {
    this.newFolderName = '';
    this.showAddFolder = false;
    this.loadDirectory(this.directoryPath);
   } else {
    alert('Failed to create folder.');
   }
  });
 }

 createFile() {
  const fileName = this.newFileName.trim();
  if (!fileName) return;
  const fullPath = `${this.directoryPath}/${fileName}${this.selectedExtension}`;
  this.file.createFile(fullPath).then(success => {
   if (success) {
    this.showAddFile = false;
    this.newFileName = '';
    this.selectedExtension = '.txt';
    this.loadDirectory(this.directoryPath);
   } else {
    alert('Failed to create file.');
   }
  });
 }

 isAllowedFile(file: string): boolean {
  return file.toLowerCase().endsWith('.xlsx') || file.toLowerCase().endsWith('.txt');
 }

 async loadDirectory(path: string) {
  this.file.listFoldersAndFiles(path).then((result: any) => {
   this.folderList = result.folders;
   this.fileList = result.files;
   this.cd.detectChanges();
  }).catch((err: Error) => {
   this.folderList = [];
   this.fileList = [];
   this.cd.detectChanges();
  });
 }

 onFolderChange(folder: string) {
  if (!folder) return;
  this.directoryPath = `${this.directoryPath}/${folder}`;
  this.loadDirectory(this.directoryPath);
 }

 modifyFile() {
  if (!this.selectedFile) {
   alert('Please select a file to modify.');
   return;
  }
  if (this.selectedFile.toLowerCase().endsWith('.txt')) {
   this.directoryPath = `${this.directoryPath}/${this.selectedFile}`;
   localStorage.setItem("directory", this.directoryPath);
   this.router.navigate(["textfile"])
  } else if (this.selectedFile.toLowerCase().endsWith('.xlsx')) {
   this.directoryPath = `${this.directoryPath}/${this.selectedFile}`;
   localStorage.setItem("directory", this.directoryPath);
   this.router.navigate(["excelfile"])
  }
 }

}

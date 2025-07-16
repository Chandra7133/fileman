import { Component, inject, OnInit } from '@angular/core';
import { File } from '../../utils/file';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router"
import { ChangeDetectorRef } from '@angular/core';
@Component({
 selector: 'app-textfile',
 imports: [FormsModule],
 templateUrl: './textfile.html',
})
export class Textfile implements OnInit {
 selectedFileContent = '';
 editMode = false;
 private readonly file = inject(File)
 private readonly router = inject(Router)
 private readonly cd = inject(ChangeDetectorRef)
 dir: string = localStorage.getItem("directory") || "";

 ngOnInit(): void {
  this.openTextFile()
 }

 openTextFile() {
  const fullPath = localStorage.getItem("directory") || "";
  if (fullPath) {
   this.file.readTextFile(fullPath).then(content => {
    this.selectedFileContent = content;
    this.editMode = true;
    this.cd.detectChanges();
   });
  }
 }

 saveTextFile() {
  const fullPath = localStorage.getItem("directory") || "";
  if (fullPath) {
   this.file.writeTextFile(fullPath, this.selectedFileContent).then(success => {
    if (success) alert('File saved successfully');
    else alert('Failed to save file');
   });
  }
 }

 goback() {
  const parts = this.dir.split('/');
  if (parts.length > 1) {
   parts.pop();
   const dir = parts.join('/') || '/';
   localStorage.setItem("directory", dir);
   this.router.navigate(["layout"])
  }
 }

}

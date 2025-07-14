import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-excelfile',
  imports: [],
  templateUrl: './excelfile.html',
})
export class Excelfile implements OnInit {

 dir: string = localStorage.getItem("directory") || "";
 private readonly router = inject(Router)

 ngOnInit(): void {
  // this.openTextFile()
 }

 goback(){
  const parts = this.dir.split('/');
  if (parts.length > 1) {
   parts.pop(); 
   const dir = parts.join('/') || '/';
   localStorage.setItem("directory",dir);
   this.router.navigate(["layout"])
  }
 }
} 

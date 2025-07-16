import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { File } from '../../utils/file';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
 selector: 'app-excelfile',
 imports: [FormsModule, CommonModule],
 templateUrl: './excelfile.html',
})
export class Excelfile implements OnInit {

 fullPath: string = localStorage.getItem("directory") || "";
 private readonly router = inject(Router)
 private readonly file = inject(File)
 private readonly cd = inject(ChangeDetectorRef)
 tableData: any = []
 labels: any = []

 record: any = {}
 id: any = ""
 buttonText: string = "💾 Save"

 isShow: boolean = false;
 newColumn: string = ""


 ngOnInit(): void {
  this.getDetails()
 }

 getDetails() {
  this.file.readExcel(this.fullPath).then((data: any) => {
   this.tableData = data;
   this.labelExtractor(data);
   this.cd.detectChanges();
  });
 }

 labelExtractor(data: any) {
  const keys = [...new Set(data.flatMap((obj: any) => Object.keys(obj)))];
  this.labels = keys.filter(item => item !== "id");
 }

 addColumn() {
  this.labels.push(this.newColumn);
  this.newColumn = ""
  this.isShow = false
 }

 save() {
  if (this.buttonText == "💾 Save") {
   this.file.createExcelRecord(this.fullPath, this.record);
  } else {
   this.file.updateExcelRecord(this.fullPath, this.id, this.record);
  }
  this.getDetails()
  this.clear()
 }

 edit(data: any) {
  this.id = data.id;
  delete data.id;
  this.record = { ...data };
  this.buttonText = "✏️ Edit";
 }

 del(data: any) {
  const confirm = window.confirm("Do you want to delete this record?")
  if (confirm) {
   this.file.removeExcelRecord(this.fullPath, data.id);
   this.getDetails();
  }
 }

 clear() {
  for (let key in this.record) {
   if (this.record.hasOwnProperty(key)) {
    this.record[key] = "";
   }
  }
  this.buttonText = "💾 Save"
 }

 goback() {
  const parts = this.fullPath.split('/');
  if (parts.length > 1) {
   parts.pop();
   const dir = parts.join('/') || '/';
   localStorage.setItem("directory", dir);
   this.router.navigate(["layout"])
  }
 }

} 

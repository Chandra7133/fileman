import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: "", redirectTo: "layout", pathMatch: "full" },
 { path: "layout", loadComponent: () => import("./layout/layout").then((c) => c.Layout) },
 { path: "textfile", loadComponent: () => import("./layout/textfile/textfile").then((c) => c.Textfile) },
 { path: "excelfile", loadComponent: () => import("./layout/excelfile/excelfile").then((c) => c.Excelfile) },
];

import { Routes } from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";

export const routes: Routes = [
  {path: "", component: ErrorPageComponent, pathMatch: "full"},
];

import {Component,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {BugReportComponent} from "./util-components/bug-report/bug-report.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ErrorPageComponent, BugReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'bugreportApp';
}

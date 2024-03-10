import {Component, OnInit} from '@angular/core';
import {BugReportComponent} from "../util-components/bug-report/bug-report.component";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    BugReportComponent
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit{
    ngOnInit(): void {
      console.log("START ERROR")
      console.error("Error Log without new Error")
      console.error(new Error("Error with Massage"))
      console.error(new Error("other ErrorMassage"))
      console.log("END ERROR")
    }


}

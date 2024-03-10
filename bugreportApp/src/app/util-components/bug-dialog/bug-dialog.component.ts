import {Component, Input} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {BugReport} from "../bug-report/bug-report.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-bug-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './bug-dialog.component.html',
  styleUrl: './bug-dialog.component.scss'
})
export class BugDialogComponent {
  @Input()
  errorContent?: BugReport

  toClipboard(dialogcontent: HTMLElement) {
    window.navigator.clipboard.writeText(
      dialogcontent.innerText
    )
  }

  savePDF(content: HTMLElement) {
    const fileName = "bugreport.txt"
    const file = new Blob([content.innerText], {type: "text/plain"})
    const link = document.createElement("a")
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }
}

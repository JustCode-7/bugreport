import {Component, HostListener, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {BugDialogComponent} from "../bug-dialog/bug-dialog.component";
import {MatToolbar} from "@angular/material/toolbar";
import {AsyncPipe, NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";

export interface BugReport {
  url: string
  device: string
  pdfViewerEnabled: boolean
  cookiesEnabled: boolean
  errors: Error[]
}

export let messages: Error[] = []

@Component({
  selector: 'app-bug-report',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './bug-report.component.html',
  styleUrl: './bug-report.component.scss'
})
export class BugReportComponent implements OnInit {
  bugreport!: BugReport;
  keystroke = new BehaviorSubject<boolean>(false);

  constructor(public dialog: MatDialog) {
  }


  ngOnInit(): void {
    messages = []
    this.initConsoleErrorListener();
  }

  reportBug() {
    let dialogRef = this.dialog.open(BugDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.errorContent = this.bugreport;
    dialogRef.afterClosed().subscribe(
      () => this.keystroke.next(false)
    )
  }


  @HostListener('document:keydown', ['$event'])
  keystrokeEvent($event: KeyboardEvent) {
    if ($event.ctrlKey && $event.altKey && $event.code === "KeyB") {
      if (this.keystroke.value) {
        this.keystroke.next(false);
        window.location.reload()
      }
      this.keystroke.next(true);
    }
  }

  private initConsoleErrorListener() {
    console.error = (originLogFn => (msg) => {
      if (messages.length > 20) {
        messages = []
      }
      if (typeof msg !== typeof Error) {
        msg = new Error(msg)
      }
      if (!messages.includes(msg) && !this.isErrorAlreadyPresent(msg)) {
        messages.push(msg)

        this.bugreport = {
          url: window.location.href,
          device: window.navigator.userAgent,
          pdfViewerEnabled: window.navigator.pdfViewerEnabled,
          cookiesEnabled: window.navigator.cookieEnabled,
          errors: messages
        }
      }
      originLogFn.apply(console, [msg]);
      this.keystroke.next(true)
    })(console.error);
  }

  private isErrorAlreadyPresent(msg: Error) {
    let some = messages.some(value => value.message === msg.message)
    if (some) {
      let index = messages.indexOf(<Error>messages.find(value => value.message === msg.message))
      messages[index] = msg;
    }
    return some;
  }
}

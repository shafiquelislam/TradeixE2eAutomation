import { Component } from '@angular/core';

@Component({
  selector: 'html-report',
  templateUrl: '../../target/screenshots/tradeix-e2e-report.html'
})
export class HtmlReportComponent {
  title = 'TRADEIX e2e Report';
  reportShowHide = false;
}

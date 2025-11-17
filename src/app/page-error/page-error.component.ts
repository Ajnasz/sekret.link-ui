import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css'],
  standalone: false,
})
export class PageErrorComponent implements OnInit {
  @Input() error: number;
  @Input() errorMessage: string;

  ngOnInit(): void {
    if (!this.errorMessage) {
      switch (this.error) {
        case 404:
          this.errorMessage = 'Secret not found';
          break;
        case 401:
          this.errorMessage = 'Unauthorized';
          break;
        case 410:
          this.errorMessage = 'Secret has been deleted';
          break;
        default:
          this.errorMessage = 'Unknown error';
      }
    }
  }
}

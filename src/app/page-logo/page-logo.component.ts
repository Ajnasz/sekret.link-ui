import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-page-logo',
  templateUrl: './page-logo.component.html',
  styleUrls: ['./page-logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLogoComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.cdr.detach();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageFooterComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.cdr.detach();
  }
}

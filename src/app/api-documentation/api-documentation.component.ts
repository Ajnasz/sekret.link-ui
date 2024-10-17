import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiDocumentationComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('API Documentation');
    this.cdr.detach();
  }
}

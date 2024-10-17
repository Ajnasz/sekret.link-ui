import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent implements OnInit {
  constructor(
    private titleService: TitleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Privacy Policy');
    this.cdr.detach();
  }
}

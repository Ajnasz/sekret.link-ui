import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private titleService: TitleService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Privacy Policy');
  }
}

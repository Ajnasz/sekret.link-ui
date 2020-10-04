import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-apidocumentation',
  templateUrl: './apidocumentation.component.html',
  styleUrls: ['./apidocumentation.component.css']
})
export class APIDocumentationComponent implements OnInit {

  constructor(
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('API Documentation');
  }

  ngOnInit(): void {
  }
}

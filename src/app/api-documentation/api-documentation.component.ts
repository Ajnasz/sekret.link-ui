import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css']
})
export class ApiDocumentationComponent implements OnInit {

  constructor(
    private titleService: TitleService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('API Documentation');
  }

}

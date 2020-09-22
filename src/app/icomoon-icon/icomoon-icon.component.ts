import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icomoon-icon',
  templateUrl: './icomoon-icon.component.html',
  styleUrls: ['./icomoon-icon.component.css']
})
export class IcomoonIconComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }
}

import { Component, OnInit, Input } from '@angular/core';

import { Secret } from '../secret';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
    @Input() secret: Secret;
    @Input() isReadonly = false;

  constructor() { }

  ngOnInit(): void {
  }

}

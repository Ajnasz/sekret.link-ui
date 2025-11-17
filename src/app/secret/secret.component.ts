import { Component, Input } from '@angular/core';

import { Secret } from '../secret';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css'],
  standalone: false,
})
export class SecretComponent {
  @Input() secret: Secret;
  @Input() isReadonly = false;
}

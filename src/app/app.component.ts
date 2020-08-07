import { Component } from '@angular/core';

import { Secret } from './secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    secret: Secret = {
        Data: 'Secret',
        Created: new Date(),
    };
    title = 'Secret Note Share';
}

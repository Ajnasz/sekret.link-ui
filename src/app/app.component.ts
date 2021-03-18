import { Component, ElementRef, ViewChild } from '@angular/core';

import { Secret } from './secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
    secret: Secret = {
      UUID: '',
      Data: 'Secret',
      Created: new Date(),
      DeleteKey: '',
    };

    @ViewChild('navBurger') navBurger: ElementRef;
    @ViewChild('navMenu') navMenu: ElementRef;

    toggleNavbar(): void {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
    }
}

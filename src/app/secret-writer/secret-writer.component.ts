import { Component, OnInit, Input } from '@angular/core';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';

@Component({
  selector: 'app-secret-writer',
  templateUrl: './secret-writer.component.html',
  styleUrls: ['./secret-writer.component.css']
})
export class SecretWriterComponent implements OnInit {
    secret: Secret = null;
    newURL = '';
    copied = false;
    expirations = [
      {text: '1 Hour', value: '1h'},
      {text: '1 Day', value: '24h'},
      {text: '1 Week', value: `${24 * 7}h`},
      {text: '30 Days', value: `${24 * 7 * 30}h`},
    ];
    selectedExpiration = '1d';

    get isSecretReady(): boolean {
      return this.newURL !== '';
    }

    constructor(
        private secretService: SecretService,
    ) {
    }

    onSubmit(): void {
        this.secretService.saveSecret(this.secret.Data, this.selectedExpiration).subscribe((secret: Secret) => {
          this.newURL = `${window.location.protocol}//${window.location.host}/view/${secret.UUID}#${secret.Key}`;
        });
    }

    copySecretUrl(url: string): void {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.copied = true;
    }

    enableCopy(): void {
      this.copied = false;
    }

    updateSelectedExpirateion(value: string): void {
      this.selectedExpiration = value;
    }

    ngOnInit(): void {
        this.secret = {
            Data: '',
            Created: null,
        };
    }
}

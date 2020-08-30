import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';

const ONE_HOUR = '1h';
const ONE_DAY = '24h';
const ONE_WEEK = '168h';
const THIRTY_DAYS = '720h';

type EXPIRE_DURATIONS = '1h' | '24h' | '168h' | '720h';
type ExpireDurationValue = {
  text: string;
  value: EXPIRE_DURATIONS;
};

@Component({
  selector: 'app-secret-writer',
  templateUrl: './secret-writer.component.html',
  styleUrls: ['./secret-writer.component.css']
})
export class SecretWriterComponent implements OnInit {
    errorMessage = '';
    secret: Secret = null;
    newURL = '';
    copied = false;
    expirations: ExpireDurationValue[] = [
      {text: '1 Hour', value: ONE_HOUR},
      {text: '1 Day', value: ONE_DAY},
      {text: '1 Week', value: ONE_WEEK},
      {text: '30 Days', value: THIRTY_DAYS},
    ];
    selectedExpiration: EXPIRE_DURATIONS = '24h';

    get isSecretReady(): boolean {
      return this.newURL !== '';
    }

    constructor(
        private secretService: SecretService,
    ) {
    }

    validateSecret(): boolean {
      if (this.secret.Data === '') {
        this.errorMessage = 'Secret must not be empty';
        return false;
      }

      this.errorMessage = '';

      return true;
    }

    onSubmit(): void {
        if (!this.validateSecret()) {
          return;
        }

        this.secretService.saveSecret(this.secret.Data, this.selectedExpiration).subscribe((secret: Secret) => {
          this.newURL = `${window.location.protocol}//${window.location.host}/view/${secret.UUID}#${secret.Key}`;
        }, (error) => {
          this.errorMessage = error.error;
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

    updateSelectedExpiration(value: EXPIRE_DURATIONS): void {
      this.selectedExpiration = value;
    }

    ngOnInit(): void {
        this.secret = {
            Data: '',
            Created: null,
        };
    }
}

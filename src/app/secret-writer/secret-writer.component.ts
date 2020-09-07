import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';
import { EncoderService } from '../encoder.service';

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
        private encoderService: EncoderService,
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

        const password = this.encoderService.generatePassword();
        const encoded = this.encoderService.encryptData(this.secret.Data, password);

        this.secretService.saveSecret(encoded, this.selectedExpiration).subscribe((secret: Secret) => {
          this.newURL = `${window.location.protocol}//${window.location.host}/view/${secret.UUID}#${secret.Key}&${password}`;
        }, (error) => {
          let msg = error.statusText;

          if (typeof error.error === 'string') {
            msg = error.error;
          }

          this.errorMessage = msg;
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

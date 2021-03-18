import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';
import { EncoderService } from '../encoder.service';
import { TitleService } from '../title.service';
import { SecretMemoryStoreService } from '../secret-memory-store.service';
import { ReadmanagerService } from '../readmanager.service';

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
    expirations: ExpireDurationValue[] = [
      {text: '1 Hour', value: ONE_HOUR},
      {text: '1 Day', value: ONE_DAY},
      {text: '1 Week', value: ONE_WEEK},
      {text: '30 Days', value: THIRTY_DAYS},
    ];
    selectedExpiration: EXPIRE_DURATIONS = '24h';
    maxReads = 1;

    get shareWithTeam(): boolean {
      return this.maxReads > 1;
    }

    constructor(
      private secretService: SecretService,
      private encoderService: EncoderService,
      private router: Router,
      private titleService: TitleService,
      private memoryStore: SecretMemoryStoreService,
      private readManager: ReadmanagerService,
    ) { }

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

        this.secretService.saveSecret(encoded, this.selectedExpiration, this.maxReads).subscribe((secret: Secret) => {

          this.memoryStore.store(secret, password);
          this.readManager.setRead(secret.UUID);
          this.router.navigate(['/created']);
        }, (error) => {
          let msg = error.statusText;

          if (typeof error.error === 'string') {
            msg = error.error;
          }

          this.errorMessage = msg;
        });
    }

    updateSelectedExpiration(value: EXPIRE_DURATIONS): void {
      this.selectedExpiration = value;
    }

    changeShareWithTeam(): void {
      this.maxReads += 1;
    }

    ngOnInit(): void {
      this.titleService.setTitle('Share a secret');
      this.secret = {
        UUID: '',
        Data: '',
        Created: null,
        DeleteKey: '',
      };
    }
}

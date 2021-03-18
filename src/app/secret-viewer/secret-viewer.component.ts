import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';
import { EncoderService } from '../encoder.service';
import { TitleService } from '../title.service';
import { ReadmanagerService } from '../readmanager.service';

import {
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-secret-viewer',
  templateUrl: './secret-viewer.component.html',
  styleUrls: ['./secret-viewer.component.css']
})
export class SecretViewerComponent implements OnInit {
    secret: Secret;
    requestError: HttpErrorResponse;
    clientError: Error;
    secretKey: string;
    clientKey: string;
    secretID: string;

    get hasSecretData(): boolean {
      return this.secret && !!this.secret.Data;
    }

    get isSecretViewEnabled(): boolean {
      return this.hasSecretData;
    }

    get isSecretRevelViewEnabled(): boolean {
      return this.secretID && !this.isSecretViewEnabled;
    }

    constructor(
        private secretService: SecretService,
        private encoderService: EncoderService,
        private route: ActivatedRoute,
        private location: Location,
        private titleService: TitleService,
        private readManager: ReadmanagerService,
    ) { }

    readSecret(): void {
        this.secretService.getSecret(this.secretID, this.secretKey).subscribe((secretWithData: Secret) => {
          if (this.clientKey) {
            secretWithData.Data = this.encoderService.decryptData(secretWithData.Data, this.clientKey);
          }
          this.secret = secretWithData;
        }, (err) => this.requestError = err);
    }

    ngOnInit(): void {
        this.titleService.setTitle('View secret');
        const id = this.route.snapshot.paramMap.get('id');
        const hash = this.location.path(true).split('#')[1];
        const [serverKey, clientKey] = hash.split('&');

        if (!this.secretService.isValidKey(hash)) {
          this.clientError = new Error('Invalid key');
          return;
        }
        if (this.readManager.isRead(id)) {
          this.clientError = new Error('Secret already read');
          return;
        }

        this.secretKey = serverKey;
        this.clientKey = clientKey || '';
        this.secretID = id;
        this.location.replaceState('/hidden');
    }
}

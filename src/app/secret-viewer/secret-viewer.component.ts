import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';

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
    secretID: string;

    get hasSecretData(): boolean {
      return this.secret && !!this.secret.Data;
    }

    get isSecretViewEnabled(): boolean {
      return this.hasSecretData;
    }

    get isSecretRevelViewEnabled(): boolean {
      return this.secretID && !this.isSecretViewEnabled
    }

    constructor(
        private secretService: SecretService,
        private route: ActivatedRoute,
        private location: Location,
    ) {}

    readSecret(): void {
        this.secretService.getSecret(this.secretID, this.secretKey).subscribe((secretWithData: Secret) => {
            this.secret = secretWithData;
        }, (err) => this.requestError = err);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const hash = this.location.path(true).split('#')[1];

        if (!this.secretService.isValidKey(hash)) {
          this.clientError = new Error('Invalid key');
          return;
        }

        this.secretKey = hash;
        this.secretID = id;
        this.location.replaceState('/hidden');
    }
}

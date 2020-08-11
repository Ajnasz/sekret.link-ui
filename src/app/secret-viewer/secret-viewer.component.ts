import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* import { Location } from '@angular/common'; */

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

    get hasSecret(): boolean {
      return !!this.secret;
    }

    get hasSecretData(): boolean {
      return this.hasSecret && !!this.secret.Data;
    }

    get isSecretRevelViewEnabled(): boolean {
      return this.hasSecret && !this.secret.Data;
    }

    get isSecretViewEnabled(): boolean {
      return this.hasSecretData;
    }

    constructor(
        private secretService: SecretService,
        private route: ActivatedRoute,
    ) {}

    readSecret(secret: Secret): void {
        const key = this.route.snapshot.paramMap.get('key');
        this.secretService.getSecret(secret.ID, key).subscribe((secretWithData: Secret) => {
            this.secret = secretWithData;
        }, (err) => this.requestError = err);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.secretService.hasSecret(id).subscribe((secret: Secret) => {
            this.secret = secret;
        }, (err) => this.requestError = err);
    }
}

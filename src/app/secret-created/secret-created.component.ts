import { Component, OnInit } from '@angular/core';

import { Secret } from '../secret';
import { SecretMemoryStoreService } from '../secret-memory-store.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-secret-created',
  templateUrl: './secret-created.component.html',
  styleUrls: ['./secret-created.component.css']
})
export class SecretCreatedComponent implements OnInit {
  newURL: URL;
  secret: Secret;
  password: string;
  decryptData: string;
  errorMessage = '';
  copied = false;

  constructor(
    private memoryStore: SecretMemoryStoreService,
    private titleService: TitleService,
  ) {}

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

  ngOnInit(): void {
    const data = this.memoryStore.get();
    if (data) {
      const { secret, password } = data;

      if (secret && secret.UUID && secret.Key && password) {
        this.secret = secret;
        this.decryptData = `${secret.Key}&${password}`;
        this.newURL = new URL(`/view/${secret.UUID}#${secret.Key}&${password}`, window.location.toString());
        this.titleService.setTitle('Secret created');
        return;
      }
    }
    this.errorMessage = 'Secret not found';
    this.titleService.setTitle('Secret not found');
  }
}

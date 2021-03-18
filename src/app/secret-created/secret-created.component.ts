import { Component, OnInit } from '@angular/core';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';
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
  private destroyProgress: 'init' | 'progress' | 'finished' | null = null;
  destroyed = false;

  constructor(
    private secretService: SecretService,
    private memoryStore: SecretMemoryStoreService,
    private titleService: TitleService,
  ) {}

  get showDestroyConfirm(): boolean {
    return this.destroyProgress === 'init';
  }

  get canDestroySecret(): boolean {
    return this.secret.DeleteKey !== '' && this.secret.UUID !== '' && this.secret.Key !== '';
  }

  get showCreatedMessage(): boolean {
    return !this.errorMessage && this.destroyProgress === null;
  }

  get showDestroyMessage(): boolean {
    return this.destroyProgress === 'progress' || this.destroyProgress === 'finished';
  }

  get isDestroying(): boolean {
    return this.destroyProgress === 'progress';
  }

  get isDestroyFinished(): boolean {
    return this.destroyProgress === 'finished';
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


  initDestroySecret(): void {
    this.destroyProgress = 'init';
  }

  destroySecret(): void {
    this.destroyProgress = 'progress';
    this.secretService.destroySecret(this.secret).subscribe((success) => {
      this.destroyProgress = 'finished';
      this.destroyed = success;
    });
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

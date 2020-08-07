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

    get hasURL(): boolean {
        return this.newURL !== '';
    }

    constructor(
        private secretService: SecretService,
    ) {
    }

    onSubmit(): void {
        this.secretService.saveSecret(this.secret.Data).subscribe((url: string) => {
            this.newURL = url;
        });
    }

    ngOnInit(): void {
        this.secret = {
            Data: '',
            Created: null,
        };
    }

}

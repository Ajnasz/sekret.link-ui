import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';

@Component({
  selector: 'app-secret-viewer',
  templateUrl: './secret-viewer.component.html',
  styleUrls: ['./secret-viewer.component.css']
})
export class SecretViewerComponent implements OnInit {
    secret: Secret;

    constructor(
        private secretService: SecretService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const key = this.route.snapshot.paramMap.get('key');
        this.secretService.getSecret(id, key).subscribe((secret: Secret) => this.secret = secret);
    }
}

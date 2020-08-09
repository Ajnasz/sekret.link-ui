import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Secret } from '../secret';
import { SecretService } from '../secret.service';

@Component({
  selector: 'app-secret-summary',
  templateUrl: './secret-summary.component.html',
  styleUrls: ['./secret-summary.component.css']
})
export class SecretSummaryComponent implements OnInit {
  secret: Secret;

  constructor(
    private secretService: SecretService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.secretService.hasSecret(id).subscribe((secret: Secret) => {
      this.secret = secret;
    });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiDocumentationRoutingModule } from './api-documentation-routing.module';
import { ApiDocumentationComponent } from './api-documentation.component';

@NgModule({
  declarations: [ApiDocumentationComponent],
  imports: [CommonModule, ApiDocumentationRoutingModule],
})
export class ApiDocumentationModule {}

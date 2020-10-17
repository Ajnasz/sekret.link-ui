import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiDocumentationComponent } from './api-documentation.component';

const routes: Routes = [{ path: '', component: ApiDocumentationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiDocumentationRoutingModule { }

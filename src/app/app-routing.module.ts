import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecretWriterComponent } from './secret-writer/secret-writer.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';
import { SecretCreatedComponent } from './secret-created/secret-created.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { APIDocumentationComponent } from './apidocumentation/apidocumentation.component';

const routes: Routes = [
    {path: 'create', component: SecretWriterComponent},
    {path: 'created', component: SecretCreatedComponent},
    {path: 'view/:id', component: SecretViewerComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'api-doc', component: APIDocumentationComponent},
    {path: '404', component: NotFoundComponent},
    {path: '', redirectTo: '/create', pathMatch: 'full'},
    {path: 'hidden', redirectTo: '/create', pathMatch: 'full'},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecretWriterComponent } from './secret-writer/secret-writer.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';
import { SecretCreatedComponent } from './secret-created/secret-created.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/create', pathMatch: 'full' },
    { path: 'create', component: SecretWriterComponent },
    { path: 'created', component: SecretCreatedComponent },
    { path: 'view/:id', component: SecretViewerComponent },
    { path: '404', component: NotFoundComponent },
    { path: 'hidden', redirectTo: '/create', pathMatch: 'full' },
    { path: 'api-doc', loadChildren: () => import('./api-documentation/api-documentation.module').then(m => m.ApiDocumentationModule) },
    { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule) },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

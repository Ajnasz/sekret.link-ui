import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecretWriterComponent } from './secret-writer/secret-writer.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';

const routes: Routes = [
    {path: 'create', component: SecretWriterComponent},
    {path: 'view/:id/:key', component: SecretViewerComponent},
    {path: '', redirectTo: '/create', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

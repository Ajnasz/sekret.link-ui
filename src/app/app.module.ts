import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';
import { SecretComponent } from './secret/secret.component';
import { SecretWriterComponent } from './secret-writer/secret-writer.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretViewerComponent,
    SecretComponent,
    SecretWriterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/* import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';
import { SecretComponent } from './secret/secret.component';
import { SecretWriterComponent } from './secret-writer/secret-writer.component';
/* import { InMemoryDataService } from './in-memory-data.service'; */
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { APIDocumentationComponent } from './apidocumentation/apidocumentation.component';
import { IcomoonIconComponent } from './icomoon-icon/icomoon-icon.component';
import { PageLogoComponent } from './page-logo/page-logo.component';
import { SecretCreatedComponent } from './secret-created/secret-created.component';
import { PageErrorComponent } from './page-error/page-error.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretViewerComponent,
    SecretComponent,
    SecretWriterComponent,
    NotFoundComponent,
    PrivacyComponent,
    PageFooterComponent,
    APIDocumentationComponent,
    IcomoonIconComponent,
    PageLogoComponent,
    SecretCreatedComponent,
    PageErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /* HttpClientInMemoryWebApiModule.forRoot( */
    /*     InMemoryDataService, { dataEncapsulation: false } */
    /* ), */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretViewerComponent } from './secret-viewer/secret-viewer.component';
import { SecretComponent } from './secret/secret.component';
import { SecretWriterComponent } from './secret-writer/secret-writer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { IcomoonIconComponent } from './icomoon-icon/icomoon-icon.component';
import { PageLogoComponent } from './page-logo/page-logo.component';
import { SecretCreatedComponent } from './secret-created/secret-created.component';
import { PageErrorComponent } from './page-error/page-error.component';

@NgModule({ declarations: [
        AppComponent,
        SecretViewerComponent,
        SecretComponent,
        SecretWriterComponent,
        NotFoundComponent,
        PageFooterComponent,
        IcomoonIconComponent,
        PageLogoComponent,
        SecretCreatedComponent,
        PageErrorComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

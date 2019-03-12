import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatListModule, MatDividerModule, MatIconModule, MatChipsModule } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UiService } from './ui.service';
import { ObjectKeysPipe } from './object-keys.pipe';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    ObjectKeysPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule, 
    OverlayModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    UiService
  ],
  entryComponents: [ MatSpinner ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlagPickerComponent } from './flag-picker/flag-picker/flag-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    FlagPickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

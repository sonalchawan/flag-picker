import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlagPickerComponent } from './flag-picker/flag-picker/flag-picker.component';
import { SearchBoxComponent } from './search-box/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FlagPickerComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

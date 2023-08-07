import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { UserCRUDComponent } from './app.component';

@NgModule({
  declarations: [
    UserCRUDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [UserCRUDComponent]
})
export class AppModule { }

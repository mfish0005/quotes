import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule } from '@angular/common/http';
import { QuoteResolver } from './resolvers/quote.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
  ],
  providers: [QuoteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

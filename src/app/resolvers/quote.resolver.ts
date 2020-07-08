import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Quote } from '../models';
import { QuotesApiService } from 'src/app/services';

@Injectable()
export class QuoteResolver implements Resolve<Quote> {

  quote: Quote;

  constructor(private quotesApiService: QuotesApiService) { }

  // Resolve the first quote before the component loads
  resolve(): Observable<Quote> {
    return this.quotesApiService.getRandomQuote().pipe(map(res => {
      this.quote = new Quote;
      this.quote.id = res.id;

      this.quote.en = res.en;
      this.quote.author = res.author;

      // Now it will be accessible through the route
      return this.quote;
    }));
  }
}

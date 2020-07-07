import { Injectable } from '@angular/core';
import { Quote } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getFormattedQuote(quote): Quote {
    let formattedQuote = new Quote();

    formattedQuote.id = quote.id;
    formattedQuote.en = quote.en;
    formattedQuote.author = quote.author;

    return formattedQuote;
  }
}

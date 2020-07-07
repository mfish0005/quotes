import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesApiService {

  baseUrl: string = 'https://programming-quotes-api.herokuapp.com';

  previouslyUsedQuotes: Quote[] = [];

  constructor(private _http: HttpClient) { }

  addPreviouslyUsedQuote(quote) {
    this.previouslyUsedQuotes.push(quote);
  }

  getRandomQuote(): Observable<Quote> {
    const url = `${this.baseUrl}/quotes/random`;

    return this._http.get<Quote>(url);
  }

  postRating(id, rating) {
    const url = `${this.baseUrl}/quotes/vote`;

    this._http.post(url, {quoteId: id, newVote: rating}).subscribe(res => {
      console.log('POSTed rating: ', res);
    })
  }

  getAllQuotes(): Observable<Quote[]> {
    const url = `${this.baseUrl}/quotes`;

    return this._http.get<Quote[]>(url);
  }

  getSimilarQuote(quote: Quote): Observable<Quote> {
    const url = `${this.baseUrl}/quotes`;

    const splitQuote = quote.en.split(' ');
    const firstThree = splitQuote[0] + ' ' + splitQuote[1];

    return this._http.get<Quote[]>(url)
    .pipe(map(res => {
      // TODO: For loops are so 2013.  Use ES6 instead
      for(let i = 0; i <= res.length; i++) {
        // TODO: Add other ways of finding similar quotes E.G. same author or only match verbs/adjectives
        // If this is a new quote that matches the first three words of the last quote
        if (res[i] && res[i].en !== quote.en && res[i].en.includes(firstThree)) {
          if (this.previouslyUsedQuotes.find(el => el.id === res[i].id) === undefined) {
            return res[i];
          }
        }
      }

      return null;
    }));
  }
}

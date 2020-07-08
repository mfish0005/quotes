import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

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
    const firstTwoWords = splitQuote[0] + ' ' + splitQuote[1];
    const lastTwoWords = splitQuote[splitQuote.length - 2] + ' ' + splitQuote[splitQuote.length - 1];

    return this._http.get<Quote[]>(url)
    .pipe(map(res => {
      // TODO: For loops are so 2013.  Also maybe it should only match verbs/adjectives or maybe just random words
      for(let i = 0; i <= res.length; i++) {
        if (
          // If we have a different quote
          res[i] && res[i].en !== quote.en
          // AND it matches the first two OR last two
          && (res[i].en.includes(firstTwoWords) || res[i].en.includes(lastTwoWords))
          // AND it hasn't already been used
          && this.previouslyUsedQuotes.find(prevQ => prevQ.id === res[i].id) === undefined) {
            // It's somewhat similar so return it ¯\_(ツ)_/¯
            return res[i];
        }
      }

      return null;
    }));
  }
}

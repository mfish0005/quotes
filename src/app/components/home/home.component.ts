import { Component, OnInit } from '@angular/core';import { Quote } from 'src/app/models/quote.model';
import { ActivatedRoute } from '@angular/router';
import { QuotesApiService, HelperService } from 'src/app/services';

@Component({
selector: 'home-component',
templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    quote: Quote;

    rating: number;

    something = 'first second third fourth fifth';
    constructor(private quotesApiService: QuotesApiService, private helperService: HelperService, private route: ActivatedRoute) { }

    ngOnInit() {
      // The initial quote is stored in route data using a resolver
      this.quote = this.route.snapshot.data.quote;
    }

    handleRate(e) {
      // Set the rating
      this.rating = e.value ? e.value : null;

      // Vote
      this.quotesApiService.postRating(this.quote.id, this.rating);

      if (this.rating <= 3) {
        // 3 stars or less gets a random quote
        this.quotesApiService.getRandomQuote().subscribe(res => {
          this.quote = this.helperService.getFormattedQuote(res);
        });
        return;
      } else if (this.rating >= 4) {
        // 4 stars or more gets a similar quote
        this.quotesApiService.getSimilarQuote(this.quote).subscribe(res => {
          // Store the current quote
          this.quotesApiService.addPreviouslyUsedQuote(this.quote);
          // TODO: This conditional isn't very elegant.  Should probably rewrite it
          if (!res) {
            // If getSimilarQuote() returns null then get a random quote
            this.quotesApiService.getRandomQuote().subscribe(res => {
              this.quote = this.helperService.getFormattedQuote(res);
            });
          } else {
            // Format the quote regardless so saved quotes remain consistent
            this.quote = this.helperService.getFormattedQuote(res);
          }
        });
      }
    }
}
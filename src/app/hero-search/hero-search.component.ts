import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms
      .pipe(
        // Not to query the service too often
        debounceTime(300),

        // filter if (input) event produces the same term
        distinctUntilChanged(),

        // API call. Discard all the previous search results and return an Observable of the latest search
        switchMap((term: string) => this.heroService.searchHeroes(term))
      );
  }

  // This method is bound to (input) event
  search(term: string): void {
    this.searchTerms.next(term);
  }
}

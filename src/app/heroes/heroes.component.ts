import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  private subscription: Subscription;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHeroes(): void {
    this.subscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero); // Does this execure if a concurrency conflict had happend on the server side?
      });
  }

  delete(hero: Hero): void {
    // "optimisitic" optimization
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

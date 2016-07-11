import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

import * as ngCore from '@angular/core';
console.log('ngCore:', ngCore);

@Component({
    selector: 'heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: [
        'app/heroes.component.css'
    ],
    directives: [
        HeroDetailComponent
    ]
})
export class HeroesComponent implements OnInit {
    title = 'Tour of Mirros';
    public heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService
    ) {}

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.heroService
            .getHeroesSlowly()
            .then(heroes => this.heroes = heroes);
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

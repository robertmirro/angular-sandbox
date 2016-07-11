import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService
    ) {}

    ngOnInit() {
        this.heroService
            .getHeroesSlowly()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero) {
        // console.log('hero:', hero);
        this.router.navigate(['/detail', hero.id]);
    }
}
import {Component, OnInit, OnDestroy} from '@angular/core'
import {ActivatedRoute} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    sub: any;
    hero: Hero;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService
        ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.heroService
                    .getHero(id)
                    .then(hero => this.hero = hero)
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack() {
        window.history.back();
    }
}
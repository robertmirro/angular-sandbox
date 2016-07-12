import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core'
import {ActivatedRoute} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();

    sub: any;
    error: any;
    navigated = false;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService
        ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id: number;
            if ((id = params['id']) !== undefined) {
                this.navigated = true;
                this.heroService
                    .getHero(+id)
                    .then(hero => this.hero = hero)
                return;
            }

            this.navigated = false;
            this.hero = new Hero();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    saveHero() {
        this.heroService
            .saveHero(this.hero)
            .then(hero => {
                this.goBack(this.hero = hero);
            })
            .catch(error => this.error = error);
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
}
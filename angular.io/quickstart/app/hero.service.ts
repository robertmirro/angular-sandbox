import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {_heroes} from './mock-heroes';

@Injectable()
export class HeroService {
    getHeroes() {
        return Promise.resolve(_heroes);
    }

    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(() => resolve(_heroes), 2000));
    }
}
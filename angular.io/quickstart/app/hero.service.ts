import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Hero} from './hero';

@Injectable()
export class HeroService {
    private urlHeroes = 'app/heroes';

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http
            .get(this.urlHeroes)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHeroesSlowly() {
        return this.getHeroes();
        // return new Promise<Hero[]>(resolve => setTimeout(() => this.getHeroes().then(data => resolve(data)), 2000));
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    saveHero(hero: Hero): Promise<Hero> {
        return hero.id ? this.put(hero) : this.post(hero);
    }

    deleteHero(hero: Hero) {
        let urlDelete = `${this.urlHeroes}/${hero.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .delete(urlDelete, {headers: headers})
            .toPromise()
            .catch(this.handleError);
    }

    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.urlHeroes, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero) {
        let urlPut = `${this.urlHeroes}/${hero.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .put(urlPut, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('Error:', error);
        return Promise.reject(error.message || error);
    }
}
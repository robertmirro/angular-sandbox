import { Component } from '@angular/core';

import * as ngCore from '@angular/core';
console.log('ngCore:', ngCore);

export class Hero {
    id: number;
    name: string;
}

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <h2>{{hero.name}} details:</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name">
        </div>
    `
})
export class AppComponent {
    title = 'Tour of Mirros';
    hero: Hero = {
        id: 1,
        name: 'Windstorm'
    }
}

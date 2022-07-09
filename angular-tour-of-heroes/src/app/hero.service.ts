import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';

@Injectable({


  providedIn: 'root' //Torna a service injetável na raiz da aplicação
})
export class HeroService {

  constructor() { }

// Metodo da service que ira retornar um obsevable da lista dos heróis
getHeroes(): Observable<Hero[]>{
  const heroes = of(HEROES);
  return heroes;//retorna um arr observable
}

}

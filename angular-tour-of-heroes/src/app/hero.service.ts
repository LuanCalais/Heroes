import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; //service in service - Message service não está diretamente injetada em HeroComponent, mas sim na service hero.service

@Injectable({


  providedIn: 'root' //Torna a service injetável na raiz da aplicação
})
export class HeroService {

  constructor(private messageService: MessageService) { }

// Metodo da service que ira retornar um obsevable da lista dos heróis
getHeroes(): Observable<Hero[]>{
  const heroes = of(HEROES);
  this.messageService.add('HeroService say: Heroes found!');
  return heroes;//retorna um arr observable
}

}

import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; //service in service - Message service não está diretamente injetada em HeroComponent, mas sim na service hero.service
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({


  providedIn: 'root' //Torna a service injetável na raiz da aplicação
})
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private heroesUrl = 'api/heroes'; //Url para in-memory-data-service.ts

  // Seta uma mensagem vinda da heroService 
private log(message: string){
  this.messageService.add(`HeroService: ${message}`)
}

// Metodo da service que ira retornar um obsevable da lista dos heróis
getHeroes(): Observable<Hero[]>{
  const heroes = of(HEROES);
  this.messageService.add('HeroService say: Heroes found!');
  return heroes;//retorna um arr observable
}

getHero(id: Number): Observable<Hero>{
  // HEROES.find(h => h.id === id) ----- Busca um herói na lista de herói que possua o mesmo id que chegou como parametro
  const hero = HEROES.find(h => h.id === id)!;
  this.messageService.add(`HeroService say: encontrado herói id: ${id}`)
  return of(hero);
}

}

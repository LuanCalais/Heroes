import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const heroes = [
      {id: 10, name: 'StarLight'},
      {id: 11, name: 'Superman'},
      {id: 12, name: 'WonderWoman'},
      {id: 13, name: 'Queen Maeve'},
      {id: 14, name: 'Green Lantern'},
      {id: 15, name: 'Black Noir'},
      {id: 16, name: 'Wanda'},
      {id: 17, name: 'Fenix'},
      {id: 18, name: 'Thor'}
    ];

    // Retorno da API
    return {heroes};

  }

  /*
    Gerador de id 
    se a lista de heróis estiver vazia 
    o método retorna o número 11 

    se a lista não estiver vazia, o método retorna o número mais alto + 1 para gerar o nome id Único 
  */
  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  constructor() { }
}

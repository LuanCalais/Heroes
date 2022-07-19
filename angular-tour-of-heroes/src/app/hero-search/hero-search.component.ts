import { Component, OnInit } from '@angular/core';

import { from, Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
/* 
 debounceTime - define um tempo antes de executar algo
 distinctUntilChanged - apenas considera entradas distintas
 switchMap - altera para um novo do mesmo tipo no fim da execução
*/


import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  // Declaração de Async pipe 
  heroes$!: Observable<Hero[]>

  // Lista observable que recebe os termos em uma lista de string
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Push do termo da pesquisa dentro da ferramenta do observable
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      // Espera 300 milisegundos depois de cada entrada key antes de considerar o termo
      debounceTime(300),

      // igora o termpo de entrada se ele for igual ao ultimo
      distinctUntilChanged(),

      // no fim, altera para outro novo search sempre que o termo mudar
      switchMap((term: string) => this.heroService.searchHeroes(term))

    )

  }

}

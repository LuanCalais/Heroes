import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Declara uma variável heroes do tipo array Hero 
  heroes: Hero[] = [];

  // Injeta service heroService
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {

    // Chama o getHeroes() ao iniciar
    // É uma boa prática chamar no ngOnInit pois garante que está sendo chamado após o constructor
    this.getHeroes();

  }

  // Metodo que retorna os heróis da service
  // Nessa versãmos subscribe para setar após o retorno do observable
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }
}


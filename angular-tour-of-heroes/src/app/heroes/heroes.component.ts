import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Declara uma variável heroes do tipo array Hero 
  heroes: Hero[] = [];

  // Injeta service heroService
  constructor(private heroService: HeroService, private messageService: MessageService) { }

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

  add(name: string): void{

    name = name.trim();//Remove espaços no começo e no fim da string
    if(!name){ return;} // se name não existir ele finaliza

    // Adiciona o nome o herói como tipo Hero(pois é esse tipo que a service espera), e efetua o push na lista de heróis após o subscribe receber o observable
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    })

  }

  delete(hero: Hero): void{

    if(!hero){return;}

    // filter remove o herói selecionado, armazenando em um arr os heróis diferentes do herói que chegou
    // OBS - Se fosse "h => h === hero" retornaria apenas o herói selecionado
    this.heroes = this.heroes.filter(h => h !== hero);

    // Não existe nada para fazer no retorno do Observable, pois ele antecipa a remoção do herói da lista
    // porém sem o subscribe() não é possível fazer nada no servidor, como regra, Observable não efetua sem subscribe()
    this.heroService.deleteHero(hero.id).subscribe();

  }

  // Dead Code ----- Deixei para fins de consula
  // selectedHero?: Hero;
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponet say: You selected hero id=${hero.id}`);
  //   console.log(this.selectedHero);
  // }
}


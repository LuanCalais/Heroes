import { Component, OnInit, Input } from '@angular/core'; //Import do decorator @Input
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router'; //Pega a rota ativa no momento
import { Location } from '@angular/common'; // Permite navegar para a view anterior
import { HeroService } from '../hero.service';//Vamos usar para pegar o herói do servidor remoto
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id')); //Pega o id da rota ativa como um Number
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  // @Input - decorator que traz do heroes.component.ts o herói selecionado
  // ? - Porque ele não começa com valor, inclusive só aparecerá o componente em heroes.component se ele for iniciado
  @Input() hero?:Hero;

}

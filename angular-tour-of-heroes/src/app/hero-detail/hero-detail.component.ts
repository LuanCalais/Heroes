import { Component, OnInit, Input } from '@angular/core'; //Import do decorator @Input
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // @Input - decorator que traz do heroes.component.ts o herói selecionado
  // ? - Porque ele não começa com valor, inclusive só aparecerá o componente em heroes.component se ele for iniciado
  @Input() hero?:Hero;

}

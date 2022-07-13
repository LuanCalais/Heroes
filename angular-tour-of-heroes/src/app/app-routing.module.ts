import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [{
  path: 'heroes', component: HeroesComponent
}, {
  path: 'dashboard', component: DashboardComponent
}, {
  // Navega até os detalhes do herói com o id linkado
  path: 'detail/:id', component: HeroDetailComponent
}, {
  // Se o campo estiver vazio ele direciona automativamente para a dashboard
  path: '', redirectTo: '/dashboard', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

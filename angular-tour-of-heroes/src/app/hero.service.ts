import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; //service in service - Message service não está diretamente injetada em HeroComponent, mas sim na service hero.service
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Tratativa de erros para caso a API tenha algum problema nas requisições 
// Tap - Olha para os valores do observable, faz algo com ele e passa adiante 
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' //Torna a service injetável na raiz da aplicação
})
export class HeroService {

  private heroesUrl = 'api/heroes'; //Url para in-memory-data-service.ts

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  // Metodo da service que ira retornar um obsevable da lista dos heróis
  //  obs: of() && http.get() retornam um OBSERVABLE
  getHeroes(): Observable<Hero[]> {
    // Requisição http para pegar os heróis da API
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('featched heroes')), // tap faz algo com o retorno e passa adiante, nesse caso seta a mensagem
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )

    /*
      catchError - Intercepta um erro encontrado no observable de consumo da API
      handleError() - Reporta o erro, e retorna um resultado para que a aplicação continue funcionando
    */
  }


  // @param operation - Nome da operação que parou
  // @param result - valor opcional de retorno
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // Imprime no console o erro retornado
      console.log(error);

      // Uma maneira melhor de tratativa transformando o erro
      this.log(`${operation} failed: ${error.message}`);

      // Efetua um retorno vazio para que a aplicação siga funcionando
      return of(result as T);

    }
  }


  // Seta uma mensagem vinda da heroService 
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }



  getHero(id: Number): Observable<Hero> {
    // HEROES.find(h => h.id === id) ----- Busca um herói na lista de herói que possua o mesmo id que chegou como parametro
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService say: encontrado herói id: ${id}`)
    return of(hero);
  }

}

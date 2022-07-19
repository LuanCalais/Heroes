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
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )

    /*
      catchError - Intercepta um erro encontrado no observable de consumo da API
      handleError() - Reporta o erro, e retorna um resultado para que a aplicação continue funcionando
    */
  }


  // @param operation - Nome da operação que parou
  // @param result - valor opcional de retorno
  private handleError<T>(operation = 'operation', result?: T) {
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


  // busca o heroi por id, se não for encontrado será direcionado para a 404 
  getHero(id: number): Observable<Hero> {

    // Consumimos a API trazendo o herói referente ao ID
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id - ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )

    // Dead code para consulta
    // HEROES.find(h => h.id === id) ----- Busca um herói na lista de herói que possua o mesmo id que chegou como parametro
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService say: encontrado herói id: ${id}`)
    // return of(hero);
  }

  // Método para atualizar detalhe
  updateHero(hero:Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id - ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  // Método para criar um novo herói
  // Obs: ele espera a criação de id que o servidor irá fazer
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  // Método para deletar o herói
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    console.log('A')

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  // Método para fazer requisição de busca por nome
  // Retorna um observable de arr do tipo hero
  searchHeroes(term: string): Observable<Hero[]>{

    // Se o termo, com os espaços limpos for false retorna um arr vazio
    if(!term.trim()){

      return of([]);

    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(

      // Se a lista não estiver vazia dispara mensagem de heróis encontrados, se não, imprime de não encontrados
      tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )

  } 


  // header esperada para fazer post e put no server
  httpOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

}

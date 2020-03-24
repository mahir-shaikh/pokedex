import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class PokemonService {
  private ListOfPokemons: [];
  
  public set SetListOfPokemons(v) {
    this.ListOfPokemons = v;
  }
  

  // private dataUrl = 'api/pokemons';  // URL to web api
  private dataUrl = 'https://pokeapi.co/api/v2/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getPokemons (): Observable<any> {
    return this.http.get<any[]>(this.dataUrl + 'pokemon?limit=964')      
  }

  GetListOfPokemons(){
    return new Promise((resolve, reject)=>{
      if(this.ListOfPokemons){
        resolve(this.ListOfPokemons)
      }else{
        this.getPokemons().subscribe((response)=>{
          this.SetListOfPokemons = response.results;
          resolve(this.ListOfPokemons)
        })
      }
    })
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<any> {
    const url = `${this.dataUrl}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        catchError(this.handleError<any>(`getHero id=${id}`))
      );
  }

  /** GET hero by name. Will 404 if id not found */
  getPokemon(name): Promise<any> {
    return new Promise((resolve, reject)=>{
      let result = this.ListOfPokemons.find(obj => {
        return obj['name'] == name;
      })
      if(result){
        const url = result['url'];
        this.http.get(url).toPromise().then(res=>{
          resolve(res)
        })
      }else{
        resolve(null)
      }

    })
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

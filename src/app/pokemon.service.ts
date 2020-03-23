import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class PokemonService {

  private dataUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getPokemons (): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl)
      .pipe(
        catchError(this.handleError<any[]>('getPokemons', []))
      );
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
  getPokemon(name): Observable<any> {
    const url = `${this.dataUrl}/${name}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getPokemon id=${name}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPokemons(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.dataUrl}/?name=${term}`).pipe(
      catchError(this.handleError<any[]>('searchPokemons', []))
    );
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

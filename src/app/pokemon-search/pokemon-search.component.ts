import { Component, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.styl']
})
export class PokemonSearchComponent implements OnInit {
  filteredPokemons = [];
  pokemons = []
  selected: string;
  // private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService,
    private router: Router) { }

  // Push a search term into the observable stream.
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  ngOnInit(): void {
    this.getPokemons()
  }

  // filterItem(value) {
  //   if (!value) {
  //     this.filteredPokemons = []
  //   } // when nothing has typed


  //   this.filteredPokemons = Object.assign([], this.pokemons).filter(
  //     item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
  //   )
  // }

  getPokemons(): void {
    this.pokemonService.GetListOfPokemons().then((response: []) => {
      this.pokemons = response;
      this.filteredPokemons = []
      this.pokemons.forEach((obj)=>{
        this.filteredPokemons.push(obj.name)
      })
    });
  }

  searchPokemon(){
    this.router.navigate(['/','detail',this.selected])
  }

}

import { Component, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  filteredPokemons = [];
  pokemons = []
  private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.getPokemons()
  }

  filterItem(value) {
    if (!value) {
      this.filteredPokemons = []
    } // when nothing has typed


    this.filteredPokemons = Object.assign([], this.pokemons).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  getPokemons(): void {
    this.pokemonService.GetListOfPokemons().then((response: []) => {
      this.pokemons = response;
    });
  }

}

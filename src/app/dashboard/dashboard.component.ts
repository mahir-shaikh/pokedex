import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pokemons = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    if(this.pokemonService.GetListOfPokemons != undefined){
      this.pokemons = this.pokemonService.GetListOfPokemons;
    }else{
      this.pokemonService.getPokemons().subscribe(pokemons => {
        this.pokemons = pokemons.results.slice(1,5);
        this.pokemonService.SetListOfPokemons = pokemons.results;
      });
    }
  }
}

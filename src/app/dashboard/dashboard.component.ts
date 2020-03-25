import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.styl' ]
})
export class DashboardComponent implements OnInit {
  pokemons = [];
  PokemonOfTheDay;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
      this.pokemonService.GetListOfPokemons().then((response: [])=>{
        this.pokemons = response;
        this.getPotD();
      });
  }
  
  getPotD(){
    let potd = localStorage.getItem("PokemonOfTheDay");
    let storedDay = localStorage.getItem("date")
    let currentDay = new Date().toLocaleDateString();
    
    //get new random pokemon of the day only if it is new user(no localstorage value)
    //or if it is existing user but day has changed
    if(potd == undefined || (potd != undefined && storedDay != currentDay)){
      potd = this.getRandomIntInclusive(0, this.pokemons.length);
      localStorage.setItem("PokemonOfTheDay", potd)
      localStorage.setItem("date", currentDay)
    }
    // this.PokemonOfTheDay = this.pokemons[potd];
    this.pokemonService.getPokemon(this.pokemons[potd].name).then((pokemon)=>{
      this.PokemonOfTheDay = pokemon;
    })
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
}

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
      { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
      { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
      { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
      { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
      { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
      { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" }
    ];
    return { pokemons };
  }
}

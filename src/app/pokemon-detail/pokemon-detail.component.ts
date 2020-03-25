import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PokemonService }  from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: [ './pokemon-detail.component.styl' ]
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon;
  private loading = true;
  private error = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemon(name).then((pokemon)=>{
      //adding timeout so that loading animation is visible ;P
      setTimeout(() => {
        if(pokemon){
          this.pokemon = pokemon
        }else{
          //we can redirect back to inital page on refresh but the error image is amazing.
          this.error = true;
        }
        this.loading = false;        
      }, 1000);
    })
  }

  goBack(): void {
    this.location.back();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PokemonService }  from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: [ './pokemon-detail.component.css' ]
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon;

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
      this.pokemon = pokemon
    })
  }

  goBack(): void {
    this.location.back();
  }
}

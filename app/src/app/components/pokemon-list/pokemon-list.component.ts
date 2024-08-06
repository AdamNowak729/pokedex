import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 20;
  query: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(data => {
      this.pokemons = this.pokemons.concat(data.results);
      this.offset += this.limit;
    });
  }

  searchPokemons(): void {
    if (this.query) {
      this.pokemonService.searchPokemons(this.query).subscribe(data => {
        this.pokemons = [data];
      });
    } else {
      this.pokemons = [];
      this.offset = 0;
      this.loadPokemons();
    }
  }

  loadMore(): void {
    this.loadPokemons();
  }
}
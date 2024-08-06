import { Controller, Get, Query, Param, NotFoundException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { SearchPokemonDto } from './dto/search-pokemon.dto';
import { GetPokemonsDto } from './dto/get-pokemons.dto';

@Controller('api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getPokemons(@Query() query: GetPokemonsDto) {
    return this.pokemonService.getPokemons(query.offset, query.limit);
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchPokemons(@Query() query: SearchPokemonDto) {
    try {
      return await this.pokemonService.searchPokemons(query.name);
    } catch (error: any) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get(':name')
  async getPokemonDetails(@Param('name') name: string) {
    try {
      return await this.pokemonService.getPokemonDetails(name);
    } catch (error: any) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

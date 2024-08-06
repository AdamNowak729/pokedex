import { Controller, Get, Query, Param, NotFoundException, HttpStatus } from "@nestjs/common";
import { PokemonService } from './pokemon.service';

@Controller('api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemons(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.pokemonService.getPokemons(offset, limit);
  }

  @Get('search')
  async searchPokemons(@Query('name') name: string) {
    try {
      return await this.pokemonService.searchPokemons(name);
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

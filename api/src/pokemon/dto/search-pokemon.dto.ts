import { IsOptional, IsString } from 'class-validator';

export class SearchPokemonDto {
  @IsOptional()
  @IsString()
  name?: string;
}
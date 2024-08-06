import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPokemonsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

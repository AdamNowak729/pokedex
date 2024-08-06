import { Module } from '@nestjs/common';
import { PokedexApiModule } from './pokedex-api.module';

@Module({
  imports: [PokedexApiModule],
})
export class AppModule {}

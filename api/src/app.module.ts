import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokedexApiModule } from './pokedex-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PokedexApiModule,
  ],
})
export class AppModule {}

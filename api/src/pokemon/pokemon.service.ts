import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly baseUrl: string | undefined;
  private readonly logger = new Logger(PokemonService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.baseUrl = this.configService.get<string>('POKEAPI_BASE_URL');
  }

  async getPokemons(offset: number = 0, limit: number = 20): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
      );
      return response?.data;
    } catch (error) {
      this.logger.error('Failed to fetch Pokemons', error);
      throw new HttpException('Failed to fetch Pokemons', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPokemonDetails(name: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name}`)
      );
      return response?.data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch Pokemon details for ${name}`, error);
      if (error.response && error.response.status === 404) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchPokemons(name: string | undefined): Promise<any> {
    try {
      console.log(`${this.baseUrl}/pokemon/${name}`);
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name?.toLowerCase()}`)
      );
      return response?.data;
    } catch (error: any) {
      this.logger.error(`Failed to search Pokemon ${name}`, error);
      if (error.response && error.response.status === 404) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private httpService: HttpService) {}

  async getPokemons(offset: number = 0, limit: number = 20): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
    );
    return response?.data;
  }

  async getPokemonDetails(name: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name}`)
      );
      return response?.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchPokemons(name: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name}`)
      );
      return response?.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

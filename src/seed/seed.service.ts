import { Injectable } from '@nestjs/common';
import { PokeResponse } from './types/poke-response.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executePopulate() {
    const resp = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0',
    );

    const pokemons: Partial<Pokemon>[] = resp.results.map((item) => {
      const segments = item.url.split('/');
      const id: number = +segments[segments.length - 2];

      return {
        no: id,
        name: item.name,
      };
    });

    await this.pokemonModel.insertMany(pokemons);
    console.log('Populate done');

    return 'Populate done';
  }
}

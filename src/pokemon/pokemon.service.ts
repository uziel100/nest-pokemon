import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { UniqueConstraintError } from 'src/common/errors';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = new this.pokemonModel(createPokemonDto);

      await newPokemon.save();

      return newPokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel.find().limit(limit).skip(offset).sort({
      no: 1,
    });
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (Number.isInteger(Number(term))) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term ${term} not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);

      return await this.findOne(pokemon.id);
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();

    return true;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new UniqueConstraintError(
        `Pokemon with name or no already exists`,
        'Pokemon already exists',
      );
    }

    throw new InternalServerErrorException('Could not create pokemon');
  }
}

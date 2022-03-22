import { Injectable } from '@nestjs/common';
import { CacheDto } from './dto/CacheDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from './cache.entity';
import { CreateCacheDto } from './dto/CreateCacheDto';

@Injectable()
export class CacheRepository {
  constructor(
    @InjectModel(Cache.name)
    private readonly cacheModel: Model<Cache>,
  ) {}

  async addCache(createCacheDto: CreateCacheDto): Promise<CacheDto> {
    const cache = new this.cacheModel({
      ...createCacheDto,
    });
    return cache;
  }
}

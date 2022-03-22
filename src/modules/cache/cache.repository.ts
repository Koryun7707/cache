import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheDto } from './dto/CacheDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from './cache.entity';
import { CreateCacheDto } from './dto/CreateCacheDto';
import { UpdateCacheDto } from './dto/UpdateCacheDto';
import { LimitCache } from '../../common/constants/limit-cache';

@Injectable()
export class CacheRepository {
  constructor(
    @InjectModel(Cache.name)
    private readonly cacheModel: Model<Cache>,
  ) {}

  async create(createCacheDto: CreateCacheDto): Promise<CacheDto> {
    //delete old updated cache
    const caches = await this.cacheModel.find({}).sort({ updated_at: 'desc' });
    if (caches && caches.length >= LimitCache.LIMIT) {
      await this.deleteOne(caches[caches.length - 1].key);
    }
    const cache = new this.cacheModel({
      ...createCacheDto,
    });
    await cache.save();
    return cache;
  }
  async findByParam(key: string): Promise<CacheDto> {
    return this.cacheModel.findOne({
      key,
    });
  }
  async findAll(): Promise<CacheDto[]> {
    return this.cacheModel.find({});
  }
  async updateOne(
    key: string,
    updateCacheDto: UpdateCacheDto,
  ): Promise<CacheDto> {
    return this.cacheModel.findOneAndUpdate(
      { key },
      { ...updateCacheDto },
      { new: true },
    );
  }
  async deleteOne(key: string): Promise<void> {
    await this.cacheModel.deleteOne({ key });
  }
  async deleteAll(): Promise<void> {
    await this.cacheModel.deleteMany();
  }
}

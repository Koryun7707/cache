import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CacheRepository } from './cache.repository';
import { CacheDto } from './dto/CacheDto';
import { CreateCacheDto } from './dto/CreateCacheDto';
import * as crypto from 'crypto';
import { UpdateCacheDto } from './dto/UpdateCacheDto';

@Injectable()
export class CacheService {
  constructor(private readonly cacheRepository: CacheRepository) {}
  async insertCache(createCacheDto: CreateCacheDto): Promise<CacheDto> {
    const cache = await this.cacheRepository.findByParam(createCacheDto.key);
    if (cache) {
      throw new ConflictException('cache already exist');
    }
    return this.cacheRepository.create(createCacheDto);
  }
  async getCacheByKey(key: string): Promise<CacheDto> {
    let cache = await this.cacheRepository.findByParam(key);
    if (!cache) {
      console.log('Cache Miss');
      const randomString = crypto.randomBytes(24).toString('hex');
      cache = await this.insertCache({
        key,
        value: randomString,
      });
    }
    return cache;
  }
  async getAllCache(): Promise<CacheDto[]> {
    return this.cacheRepository.findAll();
  }
  async updateCache(
    key: string,
    updateCacheDto: UpdateCacheDto,
  ): Promise<CacheDto> {
    const cache = await this.cacheRepository.findByParam(key);
    if (!cache) {
      throw new NotFoundException('cache not found');
    }
    return this.cacheRepository.updateOne(key, updateCacheDto);
  }
  async deleteCache(key: string): Promise<void> {
    const cache = await this.cacheRepository.findByParam(key);
    if (!cache) {
      throw new NotFoundException('cache not found');
    }
    await this.cacheRepository.deleteOne(key);
  }
  async deleteAllCache(): Promise<void> {
    await this.cacheRepository.deleteAll();
  }
}

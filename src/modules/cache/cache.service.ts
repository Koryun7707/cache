import { Injectable } from '@nestjs/common';
import { CacheRepository } from './cache.repository';
import { CacheDto } from './dto/CacheDto';
import { CreateCacheDto } from './dto/CreateCacheDto';
@Injectable()
export class CacheService {
  constructor(private readonly cacheRepository: CacheRepository) {}
  async insertCache(createCacheDto: CreateCacheDto): Promise<CacheDto> {
    return this.cacheRepository.addCache(createCacheDto);
  }
}

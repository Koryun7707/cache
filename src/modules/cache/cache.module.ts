import { Module } from '@nestjs/common';
import { CacheRepository } from './cache.repository';
import { CacheService } from './cache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cache, cacheSchema } from './cache.entity';
import { CacheController } from './cache.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cache.name, schema: cacheSchema }]),
  ],
  providers: [CacheRepository, CacheService],
  controllers: [CacheController],
})
export class CacheModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CacheService } from './cache.service';
import { CreateCacheDto } from './dto/CreateCacheDto';
import { CacheDto } from './dto/CacheDto';
import { UpdateCacheDto } from './dto/UpdateCacheDto';
import { SuccessMessage } from '../../common/constants/success-message';

@Controller('caches')
@ApiTags('caches')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CacheDto,
    description: 'add cache',
  })
  async insertCache(@Body() createCacheDto: CreateCacheDto): Promise<CacheDto> {
    return this.cacheService.insertCache(createCacheDto);
  }
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [CacheDto],
    description: 'get all cache in stored',
  })
  async getAllCache(): Promise<CacheDto[]> {
    return this.cacheService.getAllCache();
  }
  @Get('/:key')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CacheDto,
    description: 'get cache by key',
  })
  async getCacheByKey(@Param('key') key: string): Promise<CacheDto> {
    return this.cacheService.getCacheByKey(key);
  }
  @Put('/:key')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CacheDto,
    description: 'update cache',
  })
  async updateCache(
    @Param('key') key: string,
    @Body() updateCacheDto: UpdateCacheDto,
  ): Promise<CacheDto> {
    return this.cacheService.updateCache(key, updateCacheDto);
  }
  @Delete('/:key')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'delete cache',
  })
  async deleteCache(@Param('key') key: string): Promise<SuccessMessage> {
    await this.cacheService.deleteCache(key);
    return {
      message: 'Success',
    };
  }
  @Delete('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'delete all cache',
  })
  async deleteAllCache(): Promise<SuccessMessage> {
    await this.cacheService.deleteAllCache();
    return {
      message: 'Success',
    };
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheService } from './cache.service';
import { CreateCacheDto } from './dto/CreateCacheDto';
import { CacheDto } from './dto/CacheDto';

@Controller('caches')
@ApiTags('caches')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  @ApiBearerAuth()
  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CacheDto,
    description: 'add cache',
  })
  async insertCache(@Body() createCacheDto: CreateCacheDto): Promise<CacheDto> {
    return this.cacheService.insertCache(createCacheDto);
  }
}

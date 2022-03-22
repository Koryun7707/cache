'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CacheDto {
  @IsString()
  @ApiProperty()
  key: string;

  @IsString()
  @ApiProperty()
  value: string;

  constructor(partial: Partial<CacheDto>) {
    Object.assign(this, partial);
  }
}

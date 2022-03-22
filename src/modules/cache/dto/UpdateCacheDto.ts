'use strict';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCacheDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'value is required' })
  value: string;

  @ApiProperty()
  @IsOptional()
  ttl: Date;
}

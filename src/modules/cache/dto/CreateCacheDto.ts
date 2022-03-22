'use strict';

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCacheDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'key is required' })
  key: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'value is required' })
  value: string;
}

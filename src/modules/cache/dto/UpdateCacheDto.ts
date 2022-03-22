'use strict';

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCacheDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'value is required' })
    value: string;
}

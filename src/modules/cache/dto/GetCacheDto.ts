'use strict';

import { IsNotEmpty } from 'class-validator';

export class GetCacheDto {
    @IsNotEmpty({ message: 'key is required' })
    key: string;
}

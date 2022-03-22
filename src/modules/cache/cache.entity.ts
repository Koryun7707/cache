import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UtilsService } from '../../providers/utils.service';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Cache extends Document {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true, default: UtilsService.ttlDate() })
  ttl: Date;
}

export const cacheSchema = SchemaFactory.createForClass(Cache);

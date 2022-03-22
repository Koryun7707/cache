import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const ttl = process.env.TTL_TIME || 86400; //60 * 60 * 24
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Cache extends Document {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true, default: ttl })
  ttl: number;
}

export const cacheSchema = SchemaFactory.createForClass(Cache);

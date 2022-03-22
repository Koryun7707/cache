import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cache extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  value: string;
}

export const cacheSchema = SchemaFactory.createForClass(Cache);

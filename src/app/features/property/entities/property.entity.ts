import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Property extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  price: number;

  @Prop()
  location: string;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop([String])
  features: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

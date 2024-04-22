import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  propertyID: string;

  @Prop({ required: true })
  customerID: string;

  @Prop()
  rate: number;
}

export const PropertySchema = SchemaFactory.createForClass(Review);

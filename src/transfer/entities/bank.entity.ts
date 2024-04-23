import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transfer extends Document {
  @Prop({ required: true })
  bankId: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);

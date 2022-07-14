import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetadataDocument = Metadata & Document;

@Schema({ timestamps: true })
export class Metadata {
  @Prop({ required: true })
  number_of_tables: number; 

  @Prop({ required: true })
  names_of_tables: number;

  created_date: string;
}

export const MetadataSchema =
  SchemaFactory.createForClass(Metadata);

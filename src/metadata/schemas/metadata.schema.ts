import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetadataDocument = Metadata & Document;

@Schema({ timestamps: true })
export class Metadata {
  @Prop({ required: true })
  db_name: string;

  @Prop({ required: true })
  total_number_tables: number;

  @Prop({ required: true })
  table_names: string[];

  @Prop({ required: true })
  column_data: object[];

  created_date: string;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);

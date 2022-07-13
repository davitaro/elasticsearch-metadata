import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetadataDocument = Metadata & Document;

@Schema({ timestamps: true })
export class Metadata {
  @Prop({ required: true })
  total_number_employees: number;

  @Prop({ required: true })
  most_recent_hire: string;

  @Prop({ required: true })
  department_with_lowest_number_employees: string;

  @Prop({ required: true })
  department_with_highest_number_employees: string;

  @Prop({ required: true })
  highest_salary: number;

  @Prop({ required: true })
  lowest_salary: number;

  @Prop({ required: true })
  average_salary: number;

  created_date: string;
}

export const MetadataSchema =
  SchemaFactory.createForClass(Metadata);

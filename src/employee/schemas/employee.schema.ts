import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  hiredDate: string;

  @Prop({ required: true })
  salary: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Default } from 'sequelize-typescript';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  department: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsString()
  last_shipment_date: string;

  @IsNumber()
  quantity_in_stock: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  price: number;

  @IsBoolean()
  isAvailable: boolean;
}

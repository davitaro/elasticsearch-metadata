import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  last_shipment_date: string;

  @Column()
  quantity_in_stock: number;

  @Column()
  price: number;

  @Column()
  isAvailable: boolean;
}

// array of tables, array of columns, data type of column, if type is number - what is max and min

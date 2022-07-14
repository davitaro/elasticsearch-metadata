import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  IsUUID,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column

  id: number;

  @Column
  name: string;

  @Column
  department: string;

  @Column
  category: string;

  @Column
  brand: string;

  @Column
  last_shipment_date: string;

  @Column
  quantity_in_stock: number;

  @Column
  price: number;

  @Default(true)
  @Column
  isAvailable: boolean;

  @CreatedAt
  createdDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

// array of tables, array of columns, data type of column, if type is number - what is max and min

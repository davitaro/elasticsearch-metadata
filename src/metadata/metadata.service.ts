import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize/types';
import { Product } from 'src/product/product.model';
import { ProductService } from 'src/product/product.service';
import { Table, TableObj } from './interfaces/tables.interface';

@Injectable()
export class MetadataService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAllTables(_type: string): Promise<TableObj> {
    const tableData = await this.productModel.sequelize.query(
      `SELECT tablename, schemaname, tableowner
    FROM pg_catalog.pg_tables
    WHERE schemaname != 'pg_catalog'
    AND schemaname != 'information_schema'
    ORDER BY tablename ASC;`,
    );

    const tables: any[] = tableData[0];
    const tableObj = {
      total_number_tables: tables.length,
      table_data: tables,
    };
    return tableObj;
  }

  async findAllTableNames(_type: string) {
    const allTableData = await this.findAllTables(_type);
    const allTables = await allTableData.table_data;
    const tableNames = allTables.map((table) => table.tablename);
    console.log('table names', tableNames);
    return tableNames;
  }

  async findAllColumns(_type: string) {
    const tableNames = await this.findAllTableNames(_type);
    let columns = [];
    let i;

    for (i = 0; i < tableNames.length; i++) {
      const columnCompleteData = await this.productModel.sequelize.query(
        `SELECT *
        FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name = '${tableNames[i]}';`,
      );
      if (!columnCompleteData[0].length) {
        columns.push({
          table: tableNames[i],
          number_of_columns: columnCompleteData[0].length,
          error: `no column data available for this table`,
        });
      } else {
        const selectedData = columnCompleteData[0].map((column: any) => {
          return {
            column_name: column.column_name,
            is_nullable: column.is_nullable,
            data_type: column.data_type,
          };
        });

        const columnSelectedData = {
          table: tableNames[i],
          number_of_columns: selectedData.length,
          column_names: selectedData.map((column) => column.column_name),
          column_data: selectedData,
        };
        columns.push(columnSelectedData);
      }
    }

    return columns;
  }
}

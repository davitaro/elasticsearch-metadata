import { Injectable } from '@nestjs/common';
import { InjectModel as InjectModelSQL } from '@nestjs/sequelize';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { QueryTypes } from 'sequelize/types';
import { Product } from 'src/product/product.model';
import { ProductService } from 'src/product/product.service';
import { DB } from './interfaces/db.interface';
import { Table, TableObj } from './interfaces/tables.interface';
import { Metadata, MetadataDocument } from './schemas/metadata.schema';

@Injectable()
export class MetadataService {
  constructor(
    @InjectModelSQL(Product) private productModel: typeof Product,
    @InjectModelMongo(Metadata.name)
    private metadataModel: Model<MetadataDocument>,
  ) {}

  async findDBName(): Promise<string> {
    const DBName: any = await this.productModel.sequelize.query(
      ` SELECT current_database();`,
    );
    const nameObj: DB = DBName[0][0];
    return nameObj.current_database;
  }

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

  async createMetadataObj(_type: string) {
    const dbName = await this.findDBName();
    const { total_number_tables } = await this.findAllTables(_type);
    const table_names = await this.findAllTableNames(_type);
    const column_data = await this.findAllColumns(_type);

    const metadataObj = {
      db_name: dbName,
      total_number_tables,
      table_names,
      column_data,
    };

    const createdMetadata = new this.metadataModel(metadataObj);

    return createdMetadata.save();
  }
}

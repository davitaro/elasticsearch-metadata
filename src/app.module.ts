import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeMetadataModule } from './employee-metadata/employee-metadata.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from './config/config.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.model';
import { ConfigService } from './config/config.service';
import { MetadataModule } from './metadata/metadata.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule,
    EmployeeModule,
    EmployeeMetadataModule,
    ProductModule,
    SearchModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_TYPE'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [Product],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MetadataModule,
  ],
})
export class AppModule {}

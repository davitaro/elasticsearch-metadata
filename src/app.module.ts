import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeMetadataModule } from './employee-metadata/employee-metadata.module';
import { SearchModule } from './search/search.module';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [EmployeeModule, MongooseModule.forRoot('mongodb://localhost:27017'), EmployeeMetadataModule, SearchModule, ConfigModule]
})
export class AppModule {}

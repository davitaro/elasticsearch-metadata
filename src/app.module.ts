import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeMetadataModule } from './employee-metadata/employee-metadata.module';
import { SearchModule } from './search/search.module';

@Module({
    imports: [EmployeeModule, MongooseModule.forRoot('mongodb://localhost:27017'), EmployeeMetadataModule, SearchModule]
})
export class AppModule {}

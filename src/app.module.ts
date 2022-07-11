import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeMetadataModule } from './employee-metadata/employee-metadata.module';

@Module({
    imports: [EmployeeModule, MongooseModule.forRoot('mongodb://localhost:27017'), EmployeeMetadataModule]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from 'src/employee/employee.module';
import { SearchModule } from 'src/search/search.module';
import { EmployeeMetadataController } from './employee-metadata.controller';
import { EmployeeMetadataRepository } from './employee-metadata.repository';
import { EmployeeMetadataService } from './employee-metadata.service';
import {
  EmployeeMetadata,
  EmployeeMetadataSchema,
} from './schemas/employee-metadata.schema';

@Module({
  imports: [
    SearchModule,
    EmployeeModule,
    MongooseModule.forFeature([
      { name: EmployeeMetadata.name, schema: EmployeeMetadataSchema },
    ]),
  ],
  controllers: [EmployeeMetadataController],
  providers: [EmployeeMetadataService, EmployeeMetadataRepository],
})
export class EmployeeMetadataModule {}

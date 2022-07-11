import { Module } from '@nestjs/common';
import { EmployeeMetadataController } from './employee-metadata.controller';
import { EmployeeMetadataService } from './employee-metadata.service';

@Module({
  controllers: [EmployeeMetadataController],
  providers: [EmployeeMetadataService]
})
export class EmployeeMetadataModule {}

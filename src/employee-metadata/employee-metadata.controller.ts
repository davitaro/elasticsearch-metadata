import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeMetadataService } from './employee-metadata.service';

@Controller('employee/metadata')
export class EmployeeMetadataController {
  constructor(private employeeMetadataService: EmployeeMetadataService) {}

  @Get()
  async listCurrent() {
    console.log("im listing the current stuff")
    return this.employeeMetadataService.create();
  }
}

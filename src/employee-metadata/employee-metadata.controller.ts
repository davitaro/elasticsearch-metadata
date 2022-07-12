import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeMetadataService } from './employee-metadata.service';

@Controller('employee/metadata')
export class EmployeeMetadataController {
  constructor(private employeeMetadataService: EmployeeMetadataService) {}

  @Get()
  async listCurrent() {
    return this.employeeMetadataService.create();
  }

  @Post()
  async search(@Body('text') text: string) {
    return this.employeeMetadataService.search(text);
  }
}

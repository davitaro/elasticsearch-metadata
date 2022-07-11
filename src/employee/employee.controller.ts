import { Body, Controller, Get, Post } from '@nestjs/common';
import { json } from 'stream/consumers';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async listAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post()
  async create(
    @Body() CreateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(CreateEmployeeDto);
  }
}

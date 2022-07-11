import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Logger } from '@nestjs/common';

const logger = new Logger('Employee Service', { timestamp: true });

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    logger.log(`A new employee is being created`);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    logger.log(`You are searching for all employees`);
    return this.employeeModel.find().exec();
  }
}

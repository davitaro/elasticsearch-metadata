import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Logger } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';

const logger = new Logger('Employee Service', { timestamp: true });

@Injectable()
export class EmployeeService {
  constructor(public employeeRepository: EmployeeRepository) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    logger.log(`A new employee is being created`);
    return this.employeeRepository.create(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  async findTotal(): Promise<number> {
    return this.employeeRepository.findTotal();
  }

  async findMostRecentHire(): Promise<string> {
    return this.employeeRepository.findMostRecentHire();
  }

  async findDepartmentWithHighestEmployees(): Promise<string> {
    return this.employeeRepository.findDepartmentWithHighestEmployees();
  }

  async findDepartmentWithLowestEmployees(): Promise<string> {
    return this.employeeRepository.findDepartmentWithLowestEmployees();
  }

  async findLowestSalary(): Promise<number> {
    return this.employeeRepository.findLowestSalary();
  }

  async findHighestSalary(): Promise<number> {
    return this.employeeRepository.findHighestSalary();
  }

  async findAverageSalary(): Promise<number> {
    return this.employeeRepository.findAverageSalary();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/schemas/employee.schema';
import { CreateEmployeeMetadataDto } from './dto/create-emplotee-metadata.dto';
import {
  EmployeeMetadata,
  EmployeeMetadataDocument,
} from './schemas/employee-metadata.schema';

@Injectable()
export class EmployeeMetadataRepository {
  constructor(
    @InjectModel(EmployeeMetadata.name)
    private employeeMetadataModel: Model<EmployeeMetadataDocument>,
    private employeeService: EmployeeService,
  ) {}

  async findTotalEmployees(): Promise<number> {
    const allEmployees = await this.employeeService.findAll();
    return allEmployees.length;
  }

  async findDepartmentWithLowestEmployees(): Promise<string> {
    const sortedEmployees: Employee[] = await this.employeeMetadataModel.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
    ]);
    console.log(sortedEmployees);
    return sortedEmployees[0].department;
  }

  async findDepartmentWithHighestEmployees() {}

  async findMostRecentHire() {}

  async findHighestSalary() {}

  async findLowestSalary() {}

  async findAverageSalary() {}

  async createObject(
    createEmployeeMetadataDto: CreateEmployeeMetadataDto,
  ): Promise<EmployeeMetadata> {
    const createdMetadata = new this.employeeMetadataModel(
      createEmployeeMetadataDto,
    );
    return createdMetadata.save();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findTotal(): Promise<number> {
    const count = await this.employeeModel.countDocuments();
    return count;
  }

  async findMostRecentHire(): Promise<string> {
    const sortedEmployees = await this.employeeModel
      .find()
      .sort({ hiredDate: -1 })
      .limit(1)
      .exec();

    const hiree = `${sortedEmployees[0].lastName}, ${sortedEmployees[0].firstName}`;
    return hiree;
  }

  async findDepartmentWithHighestEmployees(): Promise<string> {
    const aggregate = await this.employeeModel.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      {
        $sort: { count: -1 },
      },
    ]);
    return aggregate[0]._id;
  }

  async findDepartmentWithLowestEmployees(): Promise<string> {
    const aggregate = await this.employeeModel.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      {
        $sort: { count: 1 },
      },
    ]);
    return aggregate[0]._id;
  }

  async findLowestSalary(): Promise<number> {
    const aggregate = await this.employeeModel.aggregate([
      {
        $group: {
          _id: {},
          minSalary: { $min: '$salary' },
        },
      },
    ]);
    return aggregate[0]['minSalary'];
  }

  async findHighestSalary(): Promise<number> {
    const aggregate = await this.employeeModel.aggregate([
      {
        $group: {
          _id: {},
          maxSalary: { $max: '$salary' },
        },
      },
    ]);

    return aggregate[0]['maxSalary'];
  }

  async findAverageSalary(): Promise<number> {
    const aggregate = await this.employeeModel.aggregate([
      {
        $group: {
          _id: {},
          avgSalary: { $avg: '$salary' },
        },
      },
    ]);
    return Math.floor(aggregate[0]['avgSalary']);
  }
}

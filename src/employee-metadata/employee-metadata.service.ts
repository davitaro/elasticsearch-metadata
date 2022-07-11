import { Injectable, Logger } from '@nestjs/common';
import { EmployeeMetadataRepository } from './employee-metadata.repository';
import { EmployeeMetadata } from './schemas/employee-metadata.schema';

const logger = new Logger('Employee Metadata Service', { timestamp: true });

@Injectable()
export class EmployeeMetadataService {
  constructor(public employeeMetadataRepository: EmployeeMetadataRepository) {}

  async create(): Promise<EmployeeMetadata> {
    logger.log(`A new employee metadata object is being created`);
    const totalEmployees =
      await this.employeeMetadataRepository.findTotalEmployees();
    // const mostRecentHire =
    //   await this.employeeMetadataRepository.findMostRecentHire();
    // const departmentWithHighest =
    //   await this.employeeMetadataRepository.findDepartmentWithHighestEmployees();
    const departmentWithLowest =
      await this.employeeMetadataRepository.findDepartmentWithLowestEmployees();
    // const lowestSalary =
    //   await this.employeeMetadataRepository.findLowestSalary();
    // const highestSalary =
    //   await this.employeeMetadataRepository.findHighestSalary();
    // const averageSalary =
    //   await this.employeeMetadataRepository.findAverageSalary();

    const metadataObj = {
      total_number_of_employees: totalEmployees,
      department_with_lowest_number_employees: departmentWithLowest,
      most_recent_hire: 'John Stewart',
      department_with_highest_number_employees: 'Sales',
      highest_salary: 150000,
      lowest_salary: 34000,
      average_salary: 75000,
    };

    return this.employeeMetadataRepository.createObject(metadataObj);
  }
}

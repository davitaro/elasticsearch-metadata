import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { SearchService } from 'src/search/search.service';
import { EmployeeMetadataRepository } from './employee-metadata.repository';
import { EmployeeMetadata } from './schemas/employee-metadata.schema';

const logger = new Logger('Employee Metadata Service', { timestamp: true });

@Injectable()
export class EmployeeMetadataService {
  constructor(
    public employeeMetadataRepository: EmployeeMetadataRepository,
    public employeeService: EmployeeService,
    private employeeMetadataSearchService: SearchService,
  ) {}

  async create(): Promise<EmployeeMetadata> {
    logger.log(`A new employee metadata object is being created`);
    const totalEmployees = await this.employeeService.findTotal();
    const mostRecentHire = await this.employeeService.findMostRecentHire();
    const departmentWithHighest =
      await this.employeeService.findDepartmentWithHighestEmployees();
    const departmentWithLowest =
      await this.employeeService.findDepartmentWithLowestEmployees();
    const lowestSalary = await this.employeeService.findLowestSalary();
    const highestSalary = await this.employeeService.findHighestSalary();
    const averageSalary = await this.employeeService.findAverageSalary();

    const metadataObj = {
      total_number_employees: totalEmployees,
      most_recent_hire: mostRecentHire,
      department_with_lowest_number_employees: departmentWithLowest,
      department_with_highest_number_employees: departmentWithHighest,
      highest_salary: highestSalary,
      lowest_salary: lowestSalary,
      average_salary: averageSalary,
    };

    await this.employeeMetadataSearchService.indexEmployeeMetadata(metadataObj);

    return this.employeeMetadataRepository.createObject(metadataObj);
  }
}

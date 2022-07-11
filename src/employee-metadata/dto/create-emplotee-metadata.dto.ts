export class CreateEmployeeMetadataDto {
  total_number_employees: number;
  most_recent_hire: string;
  department_with_lowest_number_employees: string;
  department_with_highest_number_employees: string;
  highest_salary: number;
  lowest_salary: number;
  average_salary: number;
}

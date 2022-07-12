import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EmployeeMetadata } from 'src/employee-metadata/schemas/employee-metadata.schema';
import { EmployeeMetadataSearchBody } from './interfaces/employee-metadata-search-body.interface';
import { EmployeeMetadataSearchResult } from './interfaces/employee-metadata-search-result.interface';

@Injectable()
export class SearchService {
  index = 'employees';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexEmployeeMetadata(employeeMetadata: EmployeeMetadata) {
    console.log('info', await this.elasticsearchService.info());

    return await this.elasticsearchService.index<EmployeeMetadataSearchBody>({
      index: this.index,
      document: {
        total_number_employees: employeeMetadata.total_number_employees,
        department_with_lowest_number_employees:
          employeeMetadata.department_with_lowest_number_employees,
        department_with_highest_number_employees:
          employeeMetadata.department_with_highest_number_employees,
        highest_salary: employeeMetadata.highest_salary,
        lowest_salary: employeeMetadata.lowest_salary,
        average_salary: employeeMetadata.average_salary,
        most_recent_hire: employeeMetadata.most_recent_hire,
        created_date: employeeMetadata.created_date,
      },
    });
  }

  async search(text: string) {
    const body =
      await this.elasticsearchService.search<EmployeeMetadataSearchResult>({
        index: this.index,

        query: {
          query_string: {
            query: `*${text}*`,
            fields: [
              //   'total_number_employees',
              //   'most_recent_hire',
              //   'department_with_lowest_number_employees',
              //   'department_with_highest_number_employees',
              //   'highest_salary',
              //   'lowest_salary',
              //   'average_salary',
            ],
          },
        },
      });
    const hits = body.hits.hits;
    console.log('body', body);
    console.log('hits', hits);
    return hits.map((item) => item._source);
  }
}

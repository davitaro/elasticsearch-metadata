import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employee.service';
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
  ) {}

  async createObject(
    createEmployeeMetadataDto: CreateEmployeeMetadataDto,
  ): Promise<EmployeeMetadata> {
    const createdMetadata = new this.employeeMetadataModel(
      createEmployeeMetadataDto,
    );
    return createdMetadata.save();
  }
}

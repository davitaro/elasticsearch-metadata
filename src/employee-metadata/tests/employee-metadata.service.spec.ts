import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeMetadataService } from '../employee-metadata.service';

describe('EmployeeMetadataService', () => {
  let service: EmployeeMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeMetadataService],
    }).compile();

    service = module.get<EmployeeMetadataService>(EmployeeMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

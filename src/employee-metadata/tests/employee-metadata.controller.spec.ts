import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeMetadataController } from '../employee-metadata.controller';

describe('EmployeeMetadataController', () => {
  let controller: EmployeeMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeMetadataController],
    }).compile();

    controller = module.get<EmployeeMetadataController>(EmployeeMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

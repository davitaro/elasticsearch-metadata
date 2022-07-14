import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private metadataService: MetadataService) {}

  @Get('/tables')
  getTables(@Body('type') type: string) {
    return this.metadataService.findAllTables(type);
  }

  @Get('/columns')
  getColumns(@Body('type') type: string) {
    return this.metadataService.findAllColumns(type);
  }

  @Get('/dbname')
  getDBName() {
    return this.metadataService.findDBName();
  }

  @Get()
  getAll(@Body('type') type: string) {
    return this.metadataService.createMetadataObj(type);
  }
}

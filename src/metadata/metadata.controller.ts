import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Controller('metadata')
export class MetadataController {
  constructor(private productsService: ProductService) {}

  // @Get('/column')
  // getColumn() {
  //   return this.productsService.findNumberOfTables();
  // }
}

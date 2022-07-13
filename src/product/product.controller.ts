import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post('/create')
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }
}

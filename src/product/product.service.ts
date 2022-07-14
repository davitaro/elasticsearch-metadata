import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('No product was found with this id');
    }
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }

  // async findNumberOfTables(): Promise<number> {
  //   const columnMetadata = await this.productsRepository.query(
  //     ' SELECT * FROM "information_schema"."columns"',
  //   );

  //   return columnMetadata;
  // }
}

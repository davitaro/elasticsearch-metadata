import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ProductModule } from 'src/product/product.module';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { Metadata, MetadataSchema } from './schemas/employee-metadata.schema';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      {
        name: Metadata.name,
        schema: MetadataSchema,
      },
    ]),
  ],

  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}

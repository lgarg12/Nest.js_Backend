import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    try {
      return await this.databaseService.product.create({ data: createProductDto });
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.product.findMany({});
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    try {
      return await this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

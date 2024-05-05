import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() createProductDto: Prisma.ProductCreateInput) {
    try {
      const { name, price, category, description, stockQuantity } = createProductDto;
      if (!name || !price || !category || !description || !stockQuantity) {
        throw new HttpException('Missing Entry', HttpStatus.BAD_REQUEST);
      }
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(`Error creating product: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('')
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(`Error fetching products: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      throw new HttpException(`Error fetching product: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      throw new HttpException(`Error updating product: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return await this.productsService.remove(+id);
    } catch (error) {
      throw new HttpException(`Error deleting product: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: {
        ...createProductDto,
        quantity: 0,
      },
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.product.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundError('Product not found.');

      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}

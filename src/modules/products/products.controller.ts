import {Controller, Post, Get, Param} from '@nestjs/common';
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {

    }

    @Post()
    async createProduct(payload) {

    }

    @Get(':id')
    async findOneProduct(@Param() params) {
        return  await this.productsService.get(params.id);
    }

    @Get('my')
    async getMyProducts() {
        return await this.productsService.getUserProducts({}, 88);
    }

}

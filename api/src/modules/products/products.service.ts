import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from "./products.entity";
import {ProductsDto} from "./products.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {

    }

    async get(id: number) {
        return this.productRepository.findOne(id);
    }

    async getProducts(criteria: any, page: number) {
        return this.productRepository.createQueryBuilder().getMany();
    }

    async getUserProducts(criteria: any, page: number) {
        return this.productRepository.createQueryBuilder().getMany();
    }

    async createUserProducts(payload: ProductsDto) {
        return this.productRepository.create(payload);
    }

    async deleteProduct(id: number) {
        const product = this.productRepository.findOne(id);
    }


}
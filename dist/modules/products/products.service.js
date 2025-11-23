"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async searchProducts(query) {
        if (!query || query.trim() === '') {
            return this.findAll();
        }
        const searchTerm = query.trim();
        const words = searchTerm.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) {
            return this.findAll();
        }
        if (words.length === 1) {
            const searchQuery = `%${words[0]}%`;
            return await this.productRepository.find({
                where: [
                    { name: (0, typeorm_2.ILike)(searchQuery) },
                    { description: (0, typeorm_2.ILike)(searchQuery) },
                    { category: (0, typeorm_2.ILike)(searchQuery) }
                ],
            });
        }
        const searchQueries = words.map(word => `%${word}%`);
        const whereConditions = searchQueries.flatMap(searchQuery => [
            { name: (0, typeorm_2.ILike)(searchQuery) },
            { description: (0, typeorm_2.ILike)(searchQuery) },
            { category: (0, typeorm_2.ILike)(searchQuery) }
        ]);
        return await this.productRepository.find({
            where: whereConditions,
        });
    }
    async advancedSearch(searchParams) {
        const { query, category, minPrice, maxPrice } = searchParams;
        const qb = this.productRepository.createQueryBuilder('product');
        if (query) {
            qb.andWhere('(product.name ILIKE :query OR product.description ILIKE :query)', {
                query: `%${query}%`
            });
        }
        if (category) {
            qb.andWhere('product.category ILIKE :category', {
                category: `%${category}%`
            });
        }
        if (minPrice !== undefined) {
            qb.andWhere('product.price >= :minPrice', { minPrice });
        }
        if (maxPrice !== undefined) {
            qb.andWhere('product.price <= :maxPrice', { maxPrice });
        }
        return await qb.getMany();
    }
    async create(createProductDto) {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }
    async findAll() {
        return await this.productRepository.find({
            order: { id: 'ASC' }
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product #${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const updatedProduct = this.productRepository.merge(product, updateProductDto);
        return await this.productRepository.save(updatedProduct);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
    async count() {
        return await this.productRepository.count();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map
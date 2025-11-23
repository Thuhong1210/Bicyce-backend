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
var GuestCartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestCartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../products/entities/product.entity");
let GuestCartService = GuestCartService_1 = class GuestCartService {
    cartRepository;
    productRepository;
    logger = new common_1.Logger(GuestCartService_1.name);
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async addToCart(sessionId, productId, quantity) {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            if (product.quantity < quantity)
                throw new common_1.BadRequestException('Insufficient stock');
            const existing = await this.cartRepository.findOne({ where: { sessionId, productId } });
            if (existing) {
                existing.quantity += quantity;
                return this.cartRepository.save(existing);
            }
            const cartItem = this.cartRepository.create({
                sessionId,
                productId,
                quantity,
                price: product.price
            });
            return this.cartRepository.save(cartItem);
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async getCart(sessionId) {
        try {
            const cartItems = await this.cartRepository.find({
                where: { sessionId },
                relations: ['product'],
            });
            return cartItems.map(item => ({
                id: item.id,
                productId: item.productId,
                productName: item.product?.name || 'Unknown',
                quantity: item.quantity,
                price: parseFloat(item.price.toString()),
                total: item.quantity * parseFloat(item.price.toString()),
                image: item.product?.imageUrl || '/images/placeholder-product.jpg',
                stock: item.product?.quantity || 0,
            }));
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.InternalServerErrorException('Failed to get cart');
        }
    }
    async updateCartItem(sessionId, cartItemId, quantity) {
        const item = await this.cartRepository.findOne({ where: { id: cartItemId, sessionId } });
        if (!item)
            throw new common_1.NotFoundException('Cart item not found');
        const product = await this.productRepository.findOne({ where: { id: item.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.quantity < quantity)
            throw new common_1.BadRequestException('Insufficient stock');
        item.quantity = quantity;
        return this.cartRepository.save(item);
    }
    async removeFromCart(sessionId, cartItemId) {
        const item = await this.cartRepository.findOne({ where: { id: cartItemId, sessionId } });
        if (!item)
            throw new common_1.NotFoundException('Cart item not found');
        await this.cartRepository.remove(item);
    }
    async clearSessionCart(sessionId) {
        await this.cartRepository.delete({ sessionId });
    }
    async getCartItemCount(sessionId) {
        const result = await this.cartRepository
            .createQueryBuilder('cart')
            .where('cart.sessionId = :sessionId', { sessionId })
            .select('SUM(cart.quantity)', 'count')
            .getRawOne();
        return parseInt(result.count) || 0;
    }
    async checkout(sessionId, customerInfo) {
        const cartItems = await this.getCart(sessionId);
        if (!cartItems || cartItems.length === 0)
            throw new common_1.NotFoundException('Cart is empty');
        const totalAmount = cartItems.reduce((sum, i) => sum + i.total, 0);
        await this.clearSessionCart(sessionId);
        return {
            success: true,
            items: cartItems,
            totalAmount,
            itemCount: cartItems.length,
            orderInfo: {
                customerName: customerInfo?.name || 'Guest',
                email: customerInfo?.email || '',
                phone: customerInfo?.phone || '',
                address: customerInfo?.address || '',
            },
        };
    }
};
exports.GuestCartService = GuestCartService;
exports.GuestCartService = GuestCartService = GuestCartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GuestCartService);
//# sourceMappingURL=guest-cart.service.js.map
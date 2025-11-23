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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../products/entities/product.entity");
let CartService = class CartService {
    cartRepository;
    productRepository;
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async addToCart(userId, addToCartDto) {
        const product = await this.productRepository.findOne({
            where: { id: addToCartDto.productId }
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.quantity < addToCartDto.quantity) {
            throw new common_1.NotFoundException('Insufficient stock');
        }
        const existingCartItem = await this.cartRepository.findOne({
            where: {
                userId,
                productId: addToCartDto.productId
            }
        });
        if (existingCartItem) {
            existingCartItem.quantity += addToCartDto.quantity;
            return await this.cartRepository.save(existingCartItem);
        }
        else {
            const cartItem = this.cartRepository.create({
                userId,
                productId: addToCartDto.productId,
                quantity: addToCartDto.quantity,
                price: product.price
            });
            return await this.cartRepository.save(cartItem);
        }
    }
    async getCart(userId) {
        const cartItems = await this.cartRepository.find({
            where: { userId },
            relations: ['product']
        });
        return cartItems.map(item => ({
            id: item.id,
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
            image: item.product.imageUrl,
            stock: item.product.quantity,
        }));
    }
    async updateCartItem(userId, cartItemId, quantity) {
        const cartItem = await this.cartRepository.findOne({
            where: { id: cartItemId, userId }
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        const product = await this.productRepository.findOne({
            where: { id: cartItem.productId }
        });
        if (product && product.quantity < quantity) {
            throw new common_1.NotFoundException('Insufficient stock');
        }
        cartItem.quantity = quantity;
        return await this.cartRepository.save(cartItem);
    }
    async removeFromCart(userId, cartItemId) {
        const cartItem = await this.cartRepository.findOne({
            where: { id: cartItemId, userId }
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.cartRepository.remove(cartItem);
    }
    async clearCart(userId) {
        await this.cartRepository.delete({ userId });
    }
    async checkout(userId) {
        const cartItems = await this.getCart(userId);
        if (cartItems.length === 0) {
            throw new common_1.NotFoundException('Cart is empty');
        }
        const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);
        return {
            items: cartItems,
            totalAmount,
            itemCount: cartItems.length
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map
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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../customers/entities/customer.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const order_item_entity_1 = require("../orders/entities/order-item.entity");
const product_entity_1 = require("../products/entities/product.entity");
const cart_entity_1 = require("./entities/cart.entity");
let CheckoutService = class CheckoutService {
    cartRepository;
    customerRepository;
    orderRepository;
    orderItemRepository;
    productRepository;
    dataSource;
    constructor(cartRepository, customerRepository, orderRepository, orderItemRepository, productRepository, dataSource) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async guestCheckout(sessionId, customerInfo) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const cartItems = await this.cartRepository.find({
                where: { sessionId },
                relations: ['product']
            });
            console.log('🔍 [CheckoutService] Cart items found:', cartItems.length);
            if (!cartItems || cartItems.length === 0) {
                throw new common_1.NotFoundException('Giỏ hàng trống');
            }
            const processedCartItems = cartItems.map(item => {
                if (!item.product) {
                    throw new common_1.NotFoundException(`Product not found for cart item ${item.id}`);
                }
                return {
                    id: item.id,
                    productId: item.productId,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: parseFloat(item.price.toString()),
                    total: item.quantity * parseFloat(item.price.toString()),
                };
            });
            if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
                throw new common_1.BadRequestException('Vui lòng điền đầy đủ thông tin khách hàng');
            }
            let customer = await this.customerRepository.findOne({
                where: { email: customerInfo.email }
            });
            if (!customer) {
                customer = this.customerRepository.create({
                    name: customerInfo.name,
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                    address: customerInfo.shippingAddress
                });
                customer = await queryRunner.manager.save(customer);
            }
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const totalAmount = processedCartItems.reduce((sum, item) => sum + item.total, 0);
            const order = this.orderRepository.create({
                orderNumber,
                customerId: customer.id,
                totalAmount,
                shippingAddress: customerInfo.shippingAddress,
                billingAddress: customerInfo.billingAddress || customerInfo.shippingAddress,
                paymentMethod: customerInfo.paymentMethod || 'COD',
                status: order_entity_1.OrderStatus.PENDING,
                isPaid: false,
                phone: customerInfo.phone,
                email: customerInfo.email,
                customerNotes: customerInfo.notes || '',
                orderDate: new Date(),
            });
            const savedOrder = await queryRunner.manager.save(order);
            for (const item of processedCartItems) {
                const product = await this.productRepository.findOne({
                    where: { id: item.productId }
                });
                if (!product) {
                    throw new common_1.NotFoundException(`Sản phẩm #${item.productId} không tồn tại`);
                }
                if (product.quantity < item.quantity) {
                    throw new common_1.BadRequestException(`Sản phẩm "${product.name}" không đủ tồn kho`);
                }
                product.quantity -= item.quantity;
                await queryRunner.manager.save(product);
                const orderItem = this.orderItemRepository.create({
                    orderId: savedOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.total,
                });
                await queryRunner.manager.save(orderItem);
            }
            await this.cartRepository.delete({ sessionId });
            await queryRunner.commitTransaction();
            return {
                orderId: savedOrder.id,
                orderNumber: savedOrder.orderNumber,
                customerName: customer.name,
                customerEmail: customer.email,
                totalAmount: savedOrder.totalAmount,
                status: savedOrder.status,
                items: processedCartItems,
                shippingAddress: savedOrder.shippingAddress,
                paymentMethod: savedOrder.paymentMethod,
                orderDate: savedOrder.orderDate
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async userCheckout(userId, shippingInfo) {
        return { message: 'User checkout - to be implemented' };
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map
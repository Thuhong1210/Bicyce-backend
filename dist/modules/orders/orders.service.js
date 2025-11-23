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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const product_entity_1 = require("../products/entities/product.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const order_response_dto_1 = require("./dto/responses/order-response.dto");
const order_item_response_dto_1 = require("./dto/responses/order-item-response.dto");
let OrdersService = class OrdersService {
    orderRepository;
    orderItemRepository;
    productRepository;
    customerRepository;
    dataSource;
    constructor(orderRepository, orderItemRepository, productRepository, customerRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }
    async create(createOrderDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const customer = await this.customerRepository.findOne({
                where: { id: createOrderDto.customerId },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
            const orderNumber = `ORD-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
            const order = this.orderRepository.create({
                orderNumber,
                customerId: createOrderDto.customerId,
                totalAmount: 0,
                shippingAddress: createOrderDto.shippingAddress,
                billingAddress: createOrderDto.billingAddress,
                paymentMethod: createOrderDto.paymentMethod,
                status: order_entity_1.OrderStatus.PENDING,
                isPaid: false,
            });
            const savedOrder = await queryRunner.manager.save(order);
            let totalAmount = 0;
            const orderItems = [];
            for (const itemDto of createOrderDto.items) {
                const product = await this.productRepository.findOne({
                    where: { id: itemDto.productId },
                });
                if (!product)
                    throw new common_1.NotFoundException(`Product with ID ${itemDto.productId} not found`);
                if (product.quantity < itemDto.quantity)
                    throw new common_1.BadRequestException(`Insufficient stock for product: ${product.name}`);
                product.quantity -= itemDto.quantity;
                await queryRunner.manager.save(product);
                const orderItem = this.orderItemRepository.create({
                    orderId: savedOrder.id,
                    productId: itemDto.productId,
                    quantity: itemDto.quantity,
                    unitPrice: itemDto.unitPrice,
                    totalPrice: itemDto.quantity * itemDto.unitPrice,
                });
                const savedItem = await queryRunner.manager.save(orderItem);
                orderItems.push(savedItem);
                totalAmount += savedItem.totalPrice;
            }
            savedOrder.totalAmount = totalAmount;
            await queryRunner.manager.save(savedOrder);
            await queryRunner.commitTransaction();
            const completeOrder = await this.orderRepository.findOne({
                where: { id: savedOrder.id },
                relations: ['customer', 'items', 'items.product'],
            });
            if (!completeOrder) {
                throw new common_1.NotFoundException('Order not found after creation');
            }
            return this.mapToOrderResponseDto(completeOrder);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        const orders = await this.orderRepository.find({
            relations: ['customer', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
        return orders.map((order) => this.mapToOrderResponseDto(order));
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        return this.mapToOrderResponseDto(order);
    }
    async update(id, updateOrderDto) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        Object.assign(order, updateOrderDto);
        const updatedOrder = await this.orderRepository.save(order);
        return this.mapToOrderResponseDto(updatedOrder);
    }
    async remove(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        await this.orderRepository.remove(order);
    }
    async getOrdersByStatus(status) {
        const orders = await this.orderRepository.find({
            where: { status },
            relations: ['customer', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
        return orders.map((order) => this.mapToOrderResponseDto(order));
    }
    async getOrdersByCustomer(customerId) {
        const orders = await this.orderRepository.find({
            where: { customerId },
            relations: ['customer', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
        return orders.map((order) => this.mapToOrderResponseDto(order));
    }
    async updateStatus(id, status) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        order.status = status;
        if (status === 'Paid')
            order.completedAt = new Date();
        if (status === order_entity_1.OrderStatus.CANCELLED)
            order.cancelledAt = new Date();
        const updatedOrder = await this.orderRepository.save(order);
        return this.mapToOrderResponseDto(updatedOrder);
    }
    async markAsPaid(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        order.isPaid = true;
        order.paidAt = new Date();
        const updatedOrder = await this.orderRepository.save(order);
        return this.mapToOrderResponseDto(updatedOrder);
    }
    mapToOrderResponseDto(order) {
        const orderResponse = new order_response_dto_1.OrderResponseDto();
        orderResponse.id = order.id;
        orderResponse.orderNumber = order.orderNumber;
        orderResponse.customerId = order.customerId;
        orderResponse.customerName = order.customer?.name || 'Unknown Customer';
        orderResponse.customerEmail = order.customer?.email || '';
        orderResponse.customerPhone = order.customer?.phone || '';
        orderResponse.totalAmount = order.totalAmount;
        orderResponse.status = order.status;
        orderResponse.shippingAddress = order.shippingAddress;
        orderResponse.billingAddress = order.billingAddress;
        orderResponse.paymentMethod = order.paymentMethod;
        orderResponse.isPaid = order.isPaid;
        if (order.paidAt)
            orderResponse.paidAt = order.paidAt;
        if (order.completedAt)
            orderResponse.completedAt = order.completedAt;
        if (order.cancelledAt)
            orderResponse.cancelledAt = order.cancelledAt;
        orderResponse.customerNotes = order.customerNotes || '';
        orderResponse.cancellationReason = order.cancellationReason || '';
        orderResponse.items = order.items?.map((item) => {
            const itemDto = new order_item_response_dto_1.OrderItemResponseDto();
            itemDto.id = item.id;
            itemDto.productId = item.productId;
            itemDto.productName = item.product?.name || 'Unknown Product';
            itemDto.productImage = item.product?.image || item.product?.imageUrl || undefined;
            itemDto.quantity = item.quantity;
            itemDto.unitPrice = item.unitPrice;
            itemDto.totalPrice = item.totalPrice;
            return itemDto;
        }) || [];
        orderResponse.createdAt = order.createdAt;
        orderResponse.updatedAt = order.updatedAt;
        return orderResponse;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
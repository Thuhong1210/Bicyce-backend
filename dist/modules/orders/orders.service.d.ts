import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { CreateOrderDto } from './dto/requests/create-order.dto';
import { UpdateOrderDto } from './dto/requests/update-order.dto';
import { OrderResponseDto } from './dto/responses/order-response.dto';
export declare class OrdersService {
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    private customerRepository;
    private dataSource;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>, customerRepository: Repository<Customer>, dataSource: DataSource);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(): Promise<OrderResponseDto[]>;
    findOne(id: number): Promise<OrderResponseDto>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto>;
    remove(id: number): Promise<void>;
    getOrdersByStatus(status: OrderStatus): Promise<OrderResponseDto[]>;
    getOrdersByCustomer(customerId: number): Promise<OrderResponseDto[]>;
    updateStatus(id: number, status: OrderStatus): Promise<OrderResponseDto>;
    markAsPaid(id: number): Promise<OrderResponseDto>;
    private mapToOrderResponseDto;
}

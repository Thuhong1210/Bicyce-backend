import { Repository, DataSource } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Cart } from './entities/cart.entity';
export declare class CheckoutService {
    private cartRepository;
    private customerRepository;
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    private dataSource;
    constructor(cartRepository: Repository<Cart>, customerRepository: Repository<Customer>, orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>, dataSource: DataSource);
    guestCheckout(sessionId: string, customerInfo: any): Promise<any>;
    userCheckout(userId: number, shippingInfo: any): Promise<any>;
}

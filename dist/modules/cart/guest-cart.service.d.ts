import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../products/entities/product.entity';
export declare class GuestCartService {
    private cartRepository;
    private productRepository;
    private readonly logger;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    addToCart(sessionId: string, productId: number, quantity: number): Promise<Cart>;
    getCart(sessionId: string): Promise<any[]>;
    updateCartItem(sessionId: string, cartItemId: number, quantity: number): Promise<Cart>;
    removeFromCart(sessionId: string, cartItemId: number): Promise<void>;
    clearSessionCart(sessionId: string): Promise<void>;
    getCartItemCount(sessionId: string): Promise<number>;
    checkout(sessionId: string, customerInfo: any): Promise<any>;
}

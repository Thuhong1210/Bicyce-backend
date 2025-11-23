import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/requests/add-to-cart.dto';
import { Product } from '../products/entities/product.entity';
export declare class CartService {
    private cartRepository;
    private productRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    addToCart(userId: number, addToCartDto: AddToCartDto): Promise<Cart>;
    getCart(userId: number): Promise<any[]>;
    updateCartItem(userId: number, cartItemId: number, quantity: number): Promise<Cart>;
    removeFromCart(userId: number, cartItemId: number): Promise<void>;
    clearCart(userId: number): Promise<void>;
    checkout(userId: number): Promise<any>;
}

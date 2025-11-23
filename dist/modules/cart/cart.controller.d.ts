import { CartService } from './cart.service';
import { AddToCartDto } from './dto/requests/add-to-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, addToCartDto: AddToCartDto): Promise<import("./entities/cart.entity").Cart>;
    getCart(req: any): Promise<any[]>;
    updateCartItem(req: any, cartItemId: number, quantity: number): Promise<import("./entities/cart.entity").Cart>;
    removeFromCart(req: any, cartItemId: number): Promise<void>;
    clearCart(req: any): Promise<void>;
    checkout(req: any): Promise<any>;
}

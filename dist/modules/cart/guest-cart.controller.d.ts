import { GuestCartService } from './guest-cart.service';
import { CheckoutService } from './checkout.service';
export declare class GuestCartController {
    private readonly guestCartService;
    private readonly checkoutService;
    constructor(guestCartService: GuestCartService, checkoutService: CheckoutService);
    addToCart(sessionHeader: string, req: any, body: {
        productId: number;
        quantity: number;
    }): Promise<{
        success: boolean;
        message: string;
        sessionId: string;
        data: import("./entities/cart.entity").Cart;
    }>;
    getCart(sessionHeader: string, req: any): Promise<{
        success: boolean;
        sessionId: string;
        data: any[];
        summary: {
            totalItems: number;
            totalAmount: any;
        };
    }>;
    updateCartItem(sessionHeader: string, req: any, cartItemId: number, quantity: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/cart.entity").Cart;
    }>;
    removeFromCart(sessionHeader: string, req: any, cartItemId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    checkout(sessionHeader: string, req: any, customerInfo: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    clearCart(sessionHeader: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getCartCount(sessionHeader: string, req: any): Promise<{
        success: boolean;
        sessionId: string;
        count: number;
    }>;
    private generateSessionId;
    private getSessionId;
}

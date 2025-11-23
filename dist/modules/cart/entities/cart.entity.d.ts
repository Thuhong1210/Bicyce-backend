import { Product } from '../../products/entities/product.entity';
export declare class Cart {
    id: number;
    userId: number;
    sessionId: string;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
}

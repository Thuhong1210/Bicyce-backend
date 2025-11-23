import { Order } from '../../orders/entities/order.entity';
export declare class Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}

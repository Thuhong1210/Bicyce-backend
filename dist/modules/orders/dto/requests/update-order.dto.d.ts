import { OrderStatus } from '../../entities/order.entity';
export declare class UpdateOrderDto {
    status?: OrderStatus;
    shippingAddress?: string;
    billingAddress?: string;
    isPaid?: boolean;
    paidAt?: Date;
}

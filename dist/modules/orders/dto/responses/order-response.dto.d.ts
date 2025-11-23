import { OrderStatus } from '../../entities/order.entity';
import { OrderItemResponseDto } from './order-item-response.dto';
export declare class OrderResponseDto {
    id: number;
    orderNumber: string;
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: string;
    isPaid: boolean;
    paidAt: Date;
    customerNotes: string;
    cancellationReason: string;
    items: OrderItemResponseDto[];
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
    cancelledAt: Date;
}

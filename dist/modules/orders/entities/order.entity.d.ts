import { OrderItem } from './order-item.entity';
import { Customer } from '../../customers/entities/customer.entity';
export declare enum OrderStatus {
    PENDING = "Pending",
    PAID = "Paid",
    SHIPPED = "Shipped",
    CANCELLED = "Canceled"
}
export declare class Order {
    id: number;
    orderNumber: string;
    customerId: number;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: string;
    isPaid: boolean;
    paidAt: Date;
    phone: string;
    email: string;
    customerNotes: string;
    cancellationReason: string;
    completedAt: Date;
    cancelledAt: Date;
    orderDate: Date;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
    customer: Customer;
    items: OrderItem[];
}

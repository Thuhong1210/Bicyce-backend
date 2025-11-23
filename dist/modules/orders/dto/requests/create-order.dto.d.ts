export declare class CreateOrderItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export declare class CreateOrderDto {
    customerId: number;
    items: CreateOrderItemDto[];
    shippingAddress?: string;
    billingAddress?: string;
    paymentMethod?: string;
}

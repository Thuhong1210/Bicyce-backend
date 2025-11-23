import { OrderStatus } from '../../entities/order.entity';
export declare class OrderStatsDto {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusDistribution: Record<OrderStatus, number>;
    timeframe: string;
}

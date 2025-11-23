import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { DashboardStatsDto } from './dto/responses/dashboard-stats.dto';
import { SalesChartDto } from './dto/responses/sales-chart.dto';
import { TopProductDto } from './dto/responses/top-product.dto';
export declare class DashboardService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getDashboardStats(): Promise<DashboardStatsDto>;
    getSalesChart(days?: number): Promise<SalesChartDto[]>;
    getTopProducts(limit?: number): Promise<TopProductDto[]>;
    getRecentActivities(): Promise<{
        id: number;
        action: string;
        user: string;
        time: string;
        type: string;
    }[]>;
}

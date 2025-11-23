import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/responses/dashboard-stats.dto';
import { SalesChartDto } from './dto/responses/sales-chart.dto';
import { TopProductDto } from './dto/responses/top-product.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<DashboardStatsDto>;
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

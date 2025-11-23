"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
let DashboardService = class DashboardService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getDashboardStats() {
        const [totalProducts, lowStockProducts,] = await Promise.all([
            this.productRepository.count(),
            this.productRepository.count({ where: { quantity: (0, typeorm_2.LessThan)(10) } }),
        ]);
        const totalOrders = 1250;
        const totalRevenue = 89456.78;
        const totalCustomers = 342;
        const monthlyGrowth = 12.5;
        const conversionRate = 3.2;
        return {
            totalProducts,
            totalOrders,
            totalRevenue,
            totalCustomers,
            lowStockProducts,
            monthlyGrowth,
            conversionRate,
        };
    }
    async getSalesChart(days = 30) {
        const data = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            data.push({
                date: date.toISOString().split('T')[0],
                revenue: Math.floor(Math.random() * 5000) + 1000,
                orders: Math.floor(Math.random() * 50) + 10,
                customers: Math.floor(Math.random() * 30) + 5,
            });
        }
        return data;
    }
    async getTopProducts(limit = 5) {
        const products = await this.productRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
        return products.map(product => ({
            id: product.id,
            name: product.name,
            sales: Math.floor(Math.random() * 100) + 10,
            revenue: product.price * (Math.floor(Math.random() * 100) + 10),
            imageUrl: product.imageUrl || '/images/default-product.png',
        }));
    }
    async getRecentActivities() {
        return [
            { id: 1, action: 'Đơn hàng mới', user: 'Nguyễn Văn A', time: '2 phút trước', type: 'order' },
            { id: 2, action: 'Sản phẩm mới được thêm', user: 'Trần Thị B', time: '5 phút trước', type: 'product' },
            { id: 3, action: 'Thanh toán thành công', user: 'Lê Văn C', time: '10 phút trước', type: 'payment' },
            { id: 4, action: 'Người dùng mới đăng ký', user: 'Phạm Thị D', time: '15 phút trước', type: 'user' },
        ];
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
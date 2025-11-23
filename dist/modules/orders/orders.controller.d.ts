import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/requests/create-order.dto';
import { UpdateOrderDto } from './dto/requests/update-order.dto';
import { OrderResponseDto } from './dto/responses/order-response.dto';
import { OrderStatus } from './entities/order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(): Promise<OrderResponseDto[]>;
    findByStatus(status: OrderStatus): Promise<OrderResponseDto[]>;
    findOne(id: number): Promise<OrderResponseDto>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto>;
    remove(id: number): Promise<void>;
}

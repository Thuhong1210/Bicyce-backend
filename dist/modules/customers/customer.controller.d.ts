import { CustomerResponseDto } from "./dto/response/customer-response.dto";
import { ApiResponseDto } from "src/common/dto/api-response.dto";
import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: any): Promise<ApiResponseDto<Customer>>;
    findAll(req: any): Promise<ApiResponseDto<Customer[]>>;
    findOne(id: number): Promise<ApiResponseDto<CustomerResponseDto | null>>;
    update(id: number, updateCustomerDto: any): Promise<ApiResponseDto<Customer>>;
    remove(id: number): Promise<ApiResponseDto<string>>;
    seedSampleData(): Promise<ApiResponseDto<string>>;
}

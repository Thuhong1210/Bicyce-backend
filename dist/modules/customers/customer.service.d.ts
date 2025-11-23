import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    createSampleCustomers(): Promise<void>;
    create(createCustomerDto: any): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    update(id: number, updateCustomerDto: any): Promise<Customer>;
    remove(id: number): Promise<void>;
    findByEmail(email: string): Promise<Customer | null>;
}

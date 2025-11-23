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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async createSampleCustomers() {
        const customers = [
            {
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@email.com',
                phone: '0901234567',
                address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
            },
            {
                name: 'Trần Thị B',
                email: 'tranthib@email.com',
                phone: '0907654321',
                address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
            },
        ];
        for (const customerData of customers) {
            const existing = await this.customerRepository.findOne({
                where: { email: customerData.email },
            });
            if (!existing) {
                const customer = this.customerRepository.create(customerData);
                await this.customerRepository.save(customer);
            }
        }
    }
    async create(createCustomerDto) {
        const existingCustomer = await this.customerRepository.findOne({
            where: { email: createCustomerDto.email },
        });
        if (existingCustomer) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const customer = this.customerRepository.create(createCustomerDto);
        const savedCustomer = await this.customerRepository.save(customer);
        return savedCustomer;
    }
    async findAll() {
        return await this.customerRepository.find();
    }
    async findOne(id) {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto) {
        const customer = await this.findOne(id);
        if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
            const existingCustomer = await this.customerRepository.findOne({
                where: { email: updateCustomerDto.email },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        Object.assign(customer, updateCustomerDto);
        return await this.customerRepository.save(customer);
    }
    async remove(id) {
        const customer = await this.findOne(id);
        await this.customerRepository.remove(customer);
    }
    async findByEmail(email) {
        return await this.customerRepository.findOne({ where: { email } });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map
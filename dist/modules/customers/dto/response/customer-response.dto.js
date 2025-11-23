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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CustomerResponseDto {
    id;
    name;
    email;
    phone;
    address;
    created_at;
    updated_at;
}
exports.CustomerResponseDto = CustomerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the customer' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CustomerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nam Nguyen', description: 'Name of the customer' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'nam@example.com', description: 'Email of the customer' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+84123456789', description: 'Phone number of the customer', required: false }),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '175 Tay son', description: 'Address of the customer', required: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomerResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-07-14T17:00:00.000Z', description: 'Creation date of the customer' }),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-07-14T17:00:00.000Z', description: 'Update date of the customer' }),
    __metadata("design:type", Date)
], CustomerResponseDto.prototype, "updated_at", void 0);
//# sourceMappingURL=customer-response.dto.js.map
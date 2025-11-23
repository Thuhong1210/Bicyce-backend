"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_service_1 = require("./cart.service");
const guest_cart_service_1 = require("./guest-cart.service");
const checkout_service_1 = require("./checkout.service");
const cart_controller_1 = require("./cart.controller");
const guest_cart_controller_1 = require("./guest-cart.controller");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../products/entities/product.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const order_item_entity_1 = require("../orders/entities/order-item.entity");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                cart_entity_1.Cart,
                product_entity_1.Product,
                customer_entity_1.Customer,
                order_entity_1.Order,
                order_item_entity_1.OrderItem
            ])
        ],
        controllers: [cart_controller_1.CartController, guest_cart_controller_1.GuestCartController],
        providers: [cart_service_1.CartService, guest_cart_service_1.GuestCartService, checkout_service_1.CheckoutService],
        exports: [cart_service_1.CartService, guest_cart_service_1.GuestCartService],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map
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
exports.GuestCartController = void 0;
const common_1 = require("@nestjs/common");
const guest_cart_service_1 = require("./guest-cart.service");
const checkout_service_1 = require("./checkout.service");
const swagger_1 = require("@nestjs/swagger");
let GuestCartController = class GuestCartController {
    guestCartService;
    checkoutService;
    constructor(guestCartService, checkoutService) {
        this.guestCartService = guestCartService;
        this.checkoutService = checkoutService;
    }
    async addToCart(sessionHeader, req, body) {
        console.log('🔍 [POST /guest/cart/add] Headers:', req.headers);
        console.log('🔍 [POST /guest/cart/add] Body:', body);
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Using sessionId:', sessionId);
        try {
            const result = await this.guestCartService.addToCart(sessionId, body.productId, body.quantity);
            console.log('✅ [BE] Add to cart success:', result);
            return {
                success: true,
                message: 'Đã thêm vào giỏ hàng',
                sessionId: sessionId,
                data: result
            };
        }
        catch (error) {
            console.error('❌ [BE] Add to cart error:', error);
            throw error;
        }
    }
    async getCart(sessionHeader, req) {
        console.log('🔍 [GET /guest/cart] Headers:', req.headers);
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Using sessionId:', sessionId);
        try {
            const cartItems = await this.guestCartService.getCart(sessionId);
            const itemCount = await this.guestCartService.getCartItemCount(sessionId);
            console.log('✅ [BE] Cart items found:', cartItems.length);
            console.log('✅ [BE] Cart items:', cartItems);
            return {
                success: true,
                sessionId: sessionId,
                data: cartItems,
                summary: {
                    totalItems: itemCount,
                    totalAmount: cartItems.reduce((sum, item) => sum + item.total, 0)
                }
            };
        }
        catch (error) {
            console.error('❌ [BE] Get cart error:', error);
            throw error;
        }
    }
    async updateCartItem(sessionHeader, req, cartItemId, quantity) {
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Update cart item - session:', sessionId, 'item:', cartItemId, 'qty:', quantity);
        const result = await this.guestCartService.updateCartItem(sessionId, cartItemId, quantity);
        return {
            success: true,
            message: 'Đã cập nhật giỏ hàng',
            data: result
        };
    }
    async removeFromCart(sessionHeader, req, cartItemId) {
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Remove from cart - session:', sessionId, 'item:', cartItemId);
        await this.guestCartService.removeFromCart(sessionId, cartItemId);
        return {
            success: true,
            message: 'Đã xóa sản phẩm khỏi giỏ hàng'
        };
    }
    async checkout(sessionHeader, req, customerInfo) {
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Checkout - session:', sessionId);
        const result = await this.guestCartService.checkout(sessionId, customerInfo);
        return {
            success: true,
            message: 'Đặt hàng thành công',
            data: result
        };
    }
    async clearCart(sessionHeader, req) {
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Clear cart - session:', sessionId);
        await this.guestCartService.clearSessionCart(sessionId);
        return {
            success: true,
            message: 'Đã xóa toàn bộ giỏ hàng'
        };
    }
    async getCartCount(sessionHeader, req) {
        const sessionId = this.getSessionId(req, sessionHeader);
        console.log('✅ [BE] Get cart count - session:', sessionId);
        const count = await this.guestCartService.getCartItemCount(sessionId);
        return {
            success: true,
            sessionId: sessionId,
            count: count
        };
    }
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    getSessionId(req, sessionHeader) {
        if (sessionHeader) {
            console.log('📥 [BE] Using session from header:', sessionHeader);
            return sessionHeader;
        }
        const headers = req.headers;
        let sessionId = headers['x-session-id'];
        if (!sessionId) {
            sessionId = this.generateSessionId();
            console.warn('⚠️ [BE] No session ID found, generated new:', sessionId);
        }
        else {
            console.log('📥 [BE] Using session from req.headers:', sessionId);
        }
        return sessionId;
    }
};
exports.GuestCartController = GuestCartController;
__decorate([
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm sản phẩm vào giỏ hàng (khách vãng lai)' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy giỏ hàng (khách vãng lai)' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật số lượng sản phẩm' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa sản phẩm khỏi giỏ hàng' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Đặt hàng (khách vãng lai)' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "checkout", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa toàn bộ giỏ hàng' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy số lượng sản phẩm trong giỏ' }),
    __param(0, (0, common_1.Headers)('x-session-id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GuestCartController.prototype, "getCartCount", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], GuestCartController.prototype, "getSessionId", null);
exports.GuestCartController = GuestCartController = __decorate([
    (0, swagger_1.ApiTags)('Guest Cart'),
    (0, common_1.Controller)('guest/cart'),
    __metadata("design:paramtypes", [guest_cart_service_1.GuestCartService,
        checkout_service_1.CheckoutService])
], GuestCartController);
//# sourceMappingURL=guest-cart.controller.js.map
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
var UploadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
let UploadController = UploadController_1 = class UploadController {
    uploadService;
    logger = new common_1.Logger(UploadController_1.name);
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadProductImage(file, req) {
        this.logger.log('=== 🎯 BACKEND UPLOAD DEBUG ===');
        this.logger.log('📥 ALL REQUEST HEADERS:');
        Object.keys(req.headers).forEach(key => {
            this.logger.log(`  ${key}: ${req.headers[key]}`);
        });
        this.logger.log('📥 REQUEST DETAILS:');
        this.logger.log(`  Method: ${req.method}`);
        this.logger.log(`  URL: ${req.url}`);
        this.logger.log(`  Content-Type: ${req.headers['content-type']}`);
        this.logger.log(`  Content-Length: ${req.headers['content-length']}`);
        this.logger.log(`  Origin: ${req.headers['origin']}`);
        if (!file) {
            this.logger.error('❌ NO FILE OBJECT RECEIVED');
            this.logger.error('Possible issues:');
            this.logger.error('  1. Field name not "image"');
            this.logger.error('  2. CORS blocking multipart/form-data');
            this.logger.error('  3. File size too large');
            this.logger.error('  4. Multer config issue');
            this.logger.log('📥 Request body type:', typeof req.body);
            this.logger.log('📥 Request body keys:', Object.keys(req.body || {}));
            throw new common_1.BadRequestException('No file received - check field name and CORS');
        }
        this.logger.log('✅ FILE RECEIVED SUCCESSFULLY!');
        this.logger.log('📁 File details:', {
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            fieldname: file.fieldname,
            filename: file.filename
        });
        const result = {
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            path: `/uploads/products/${file.filename}`,
            url: `${process.env.APP_URL || 'http://localhost:3000'}/uploads/products/${file.filename}`,
        };
        this.logger.log('🎉 UPLOAD SUCCESS:', result);
        return result;
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('product-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadProductImage", null);
exports.UploadController = UploadController = UploadController_1 = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map
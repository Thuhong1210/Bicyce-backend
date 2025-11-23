import { UploadService } from './upload.service';
import type { Request } from 'express';
export declare class UploadController {
    private readonly uploadService;
    private readonly logger;
    constructor(uploadService: UploadService);
    uploadProductImage(file: Express.Multer.File, req: Request): Promise<{
        filename: string;
        originalName: string;
        size: number;
        path: string;
        url: string;
    }>;
}

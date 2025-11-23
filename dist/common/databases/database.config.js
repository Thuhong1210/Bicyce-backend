"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (configService) => {
    return {
        type: 'mysql',
        host: configService.get('DB_HOST') || '127.0.0.1',
        port: parseInt(configService.get('DB_PORT') || '3306', 10),
        username: configService.get('DB_USER') || 'root',
        password: configService.get('DB_PASS') || undefined,
        database: configService.get('DB_NAME') || 'sms_demo',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map
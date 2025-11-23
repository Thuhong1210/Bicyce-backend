"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function ultimateFix() {
    console.log('🚨 ULTIMATE FIX: Đang sửa database...');
    const dataSource = new typeorm_1.DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'admin',
        database: 'sms_demo',
        synchronize: false,
    });
    try {
        await dataSource.initialize();
        console.log('✅ Đã kết nối database thành công!');
        const result = await dataSource.query(`
      DELETE FROM users WHERE email = '' OR email IS NULL
    `);
        console.log(`✅ Đã xóa ${result.affectedRows} users có email trống`);
        await dataSource.destroy();
        console.log('🎉 FIX THÀNH CÔNG!');
    }
    catch (error) {
        console.error('❌ Lỗi:', error.message);
        console.log('💡 Kiểm tra:');
        console.log('   - MySQL có đang chạy trên port 3307 không?');
        console.log('   - Password "admin" có đúng không?');
        console.log('   - Database "sms_demo" có tồn tại không?');
    }
}
ultimateFix();
//# sourceMappingURL=ultimate-fix.js.map
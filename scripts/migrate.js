"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../src/db");
async function main() {
    const file = path_1.default.resolve(__dirname, '../migrations/001_init.sql');
    const sql = fs_1.default.readFileSync(file, 'utf-8');
    await db_1.db.query('BEGIN');
    try {
        await db_1.db.query(sql);
        await db_1.db.query('COMMIT');
        console.log('Migration applied');
    }
    catch (e) {
        await db_1.db.query('ROLLBACK');
        console.error('Migration failed', e);
        process.exit(1);
    }
    finally {
        await db_1.db.end();
    }
}
main();
//# sourceMappingURL=migrate.js.map
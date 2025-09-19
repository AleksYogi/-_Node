"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.query = query;
const pg_1 = require("pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}
exports.db = new pg_1.Pool({ connectionString });
async function query(text, params) {
    return exports.db.query(text, params);
}
//# sourceMappingURL=db.js.map
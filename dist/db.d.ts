import { Pool, type QueryResult, type QueryResultRow } from 'pg';
export declare const db: Pool;
export declare function query<T extends QueryResultRow = QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>>;
//# sourceMappingURL=db.d.ts.map
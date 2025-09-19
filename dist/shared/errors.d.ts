export declare class AppError extends Error {
    status: number;
    constructor(status: number, message: string);
}
export declare function notFoundMiddleware(_req: any, _res: any, next: any): void;
export declare function errorMiddleware(err: any, _req: any, res: any, _next: any): void;
//# sourceMappingURL=errors.d.ts.map
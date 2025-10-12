import type { AxiosRequestConfig } from 'axios';
import type { APIResponse, BayEngageConfig } from './types/index.js';
export declare class BayEngageClient {
    private client;
    private config;
    private maxRetries;
    constructor(config: BayEngageConfig);
    private setupInterceptors;
    private shouldRetry;
    private getRetryDelay;
    private sleep;
    private generateRequestId;
    private normalizeError;
    request<T = any>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
    get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
    post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
    put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
    patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
    delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
}
export declare function getBayEngageClient(): BayEngageClient;
export declare function resetClient(): void;
//# sourceMappingURL=client.d.ts.map
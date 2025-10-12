import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { BayEngageConfig, APIResponse } from './types/index.js';

export class BayEngageClient {
  private client: AxiosInstance;
  private config: BayEngageConfig;
  private maxRetries: number;

  constructor(config: BayEngageConfig) {
    this.config = {
      timeout: 30000,
      maxRetries: 3,
      ...config,
    };
    this.maxRetries = this.config.maxRetries ?? 3;

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-API-Key': this.config.apiKey,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        config.headers['X-Request-ID'] = this.generateRequestId();
        config.headers['X-Timestamp'] = new Date().toISOString();
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { _retryCount?: number };

        if (!config || !this.shouldRetry(error, config)) {
          return Promise.reject(this.normalizeError(error));
        }

        config._retryCount = (config._retryCount || 0) + 1;
        const delay = this.getRetryDelay(config._retryCount);

        await this.sleep(delay);
        return this.client.request(config);
      }
    );
  }

  private shouldRetry(error: AxiosError, config: any): boolean {
    const retryCount = config._retryCount || 0;

    if (retryCount >= this.maxRetries) {
      return false;
    }

    const status = error.response?.status;
    const retryableStatuses = [408, 429, 500, 502, 503, 504];

    return !status || retryableStatuses.includes(status);
  }

  private getRetryDelay(retryCount: number): number {
    const baseDelay = 1000;
    const maxDelay = 10000;
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, retryCount - 1), maxDelay);
    const jitter = Math.random() * 1000;
    return exponentialDelay + jitter;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private normalizeError(error: AxiosError): APIResponse {
    const status = error.response?.status;
    const data = error.response?.data as any;

    let errorCode = 'UNKNOWN_ERROR';
    let errorMessage = 'An unexpected error occurred';

    if (status === 400) {
      errorCode = 'BAD_REQUEST';
      errorMessage = data?.message || 'Invalid request parameters';
    } else if (status === 401) {
      errorCode = 'UNAUTHORIZED';
      errorMessage = 'Invalid API credentials';
    } else if (status === 403) {
      errorCode = 'FORBIDDEN';
      errorMessage = 'Insufficient permissions';
    } else if (status === 404) {
      errorCode = 'NOT_FOUND';
      errorMessage = 'Resource not found';
    } else if (status === 429) {
      errorCode = 'RATE_LIMIT_EXCEEDED';
      errorMessage = 'API rate limit exceeded. Please try again later.';
    } else if (status && status >= 500) {
      errorCode = 'SERVER_ERROR';
      errorMessage = 'BayEngage API server error';
    } else if (error.code === 'ECONNABORTED') {
      errorCode = 'TIMEOUT';
      errorMessage = 'Request timeout';
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorCode = 'NETWORK_ERROR';
      errorMessage = 'Network connection error';
    }

    return {
      status: 'error',
      error: {
        code: errorCode,
        message: errorMessage,
        details: data,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };
  }

  async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        data,
        ...config,
      });

      return {
        status: 'success',
        data: response.data,
        meta: {
          requestId: response.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.normalizeError(error);
      }

      return {
        status: 'error',
        error: {
          code: 'UNEXPECTED_ERROR',
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }
}

let clientInstance: BayEngageClient | null = null;

export function getBayEngageClient(): BayEngageClient {
  if (!clientInstance) {
    const apiKey = process.env.BAYENGAGE_API_KEY;
    const apiSecret = process.env.BAYENGAGE_API_SECRET;
    const baseURL = process.env.BAYENGAGE_API_URL ?? 'https://api.bayengage.com/v2';

    if (!apiKey) {
      throw new Error('BAYENGAGE_API_KEY environment variable is required');
    }

    const config: BayEngageConfig = {
      apiKey,
      baseURL,
    };

    if (apiSecret) {
      config.apiSecret = apiSecret;
    }

    clientInstance = new BayEngageClient(config);
  }

  return clientInstance;
}

export function resetClient(): void {
  clientInstance = null;
}

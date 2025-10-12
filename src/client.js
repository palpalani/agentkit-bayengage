import axios, { AxiosError } from 'axios';
export class BayEngageClient {
    client;
    config;
    maxRetries;
    constructor(config) {
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
                Authorization: `Bearer ${this.config.apiKey}`,
                'X-API-Key': this.config.apiKey,
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            config.headers['X-Request-ID'] = this.generateRequestId();
            config.headers['X-Timestamp'] = new Date().toISOString();
            return config;
        }, (error) => Promise.reject(error));
        this.client.interceptors.response.use((response) => response, async (error) => {
            const config = error.config;
            if (!config || !this.shouldRetry(error, config)) {
                return Promise.reject(this.normalizeError(error));
            }
            config._retryCount = (config._retryCount || 0) + 1;
            const delay = this.getRetryDelay(config._retryCount);
            await this.sleep(delay);
            return this.client.request(config);
        });
    }
    shouldRetry(error, config) {
        const retryCount = config._retryCount || 0;
        if (retryCount >= this.maxRetries) {
            return false;
        }
        const status = error.response?.status;
        const retryableStatuses = [408, 429, 500, 502, 503, 504];
        return !status || retryableStatuses.includes(status);
    }
    getRetryDelay(retryCount) {
        const baseDelay = 1000;
        const maxDelay = 10000;
        const exponentialDelay = Math.min(baseDelay * Math.pow(2, retryCount - 1), maxDelay);
        const jitter = Math.random() * 1000;
        return exponentialDelay + jitter;
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    normalizeError(error) {
        const status = error.response?.status;
        const data = error.response?.data;
        let errorCode = 'UNKNOWN_ERROR';
        let errorMessage = 'An unexpected error occurred';
        if (status === 400) {
            errorCode = 'BAD_REQUEST';
            errorMessage = data?.message || 'Invalid request parameters';
        }
        else if (status === 401) {
            errorCode = 'UNAUTHORIZED';
            errorMessage = 'Invalid API credentials';
        }
        else if (status === 403) {
            errorCode = 'FORBIDDEN';
            errorMessage = 'Insufficient permissions';
        }
        else if (status === 404) {
            errorCode = 'NOT_FOUND';
            errorMessage = 'Resource not found';
        }
        else if (status === 429) {
            errorCode = 'RATE_LIMIT_EXCEEDED';
            errorMessage = 'API rate limit exceeded. Please try again later.';
        }
        else if (status && status >= 500) {
            errorCode = 'SERVER_ERROR';
            errorMessage = 'BayEngage API server error';
        }
        else if (error.code === 'ECONNABORTED') {
            errorCode = 'TIMEOUT';
            errorMessage = 'Request timeout';
        }
        else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
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
    async request(method, endpoint, data, config) {
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
        }
        catch (error) {
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
    async get(endpoint, config) {
        return this.request('GET', endpoint, undefined, config);
    }
    async post(endpoint, data, config) {
        return this.request('POST', endpoint, data, config);
    }
    async put(endpoint, data, config) {
        return this.request('PUT', endpoint, data, config);
    }
    async patch(endpoint, data, config) {
        return this.request('PATCH', endpoint, data, config);
    }
    async delete(endpoint, config) {
        return this.request('DELETE', endpoint, undefined, config);
    }
}
let clientInstance = null;
export function getBayEngageClient() {
    if (!clientInstance) {
        const apiKey = process.env.BAYENGAGE_API_KEY;
        const apiSecret = process.env.BAYENGAGE_API_SECRET;
        const baseURL = process.env.BAYENGAGE_API_URL ?? 'https://api.bayengage.com/v2';
        if (!apiKey) {
            throw new Error('BAYENGAGE_API_KEY environment variable is required');
        }
        const config = {
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
export function resetClient() {
    clientInstance = null;
}
//# sourceMappingURL=client.js.map
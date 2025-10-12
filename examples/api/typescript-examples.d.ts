/**
 * BayEngage AgentKit - TypeScript Examples
 *
 * Usage:
 * npm install axios
 * npx tsx examples/api/typescript-examples.ts
 */
interface ChatRequest {
    user_input: string;
    agent?: 'default' | 'campaign_manager' | 'data_analyst';
    thread_id?: string;
}
interface ChatResponse {
    success: boolean;
    response?: string;
    trace?: Array<{
        type: string;
        timestamp: string;
        data: any;
    }>;
    error?: string;
    thread_id?: string;
}
declare class BayEngageAgentClient {
    private baseURL;
    private threadId;
    constructor(baseURL?: string);
    chat(prompt: string, agent?: 'default' | 'campaign_manager' | 'data_analyst'): Promise<ChatResponse>;
    chatWithRetry(prompt: string, agent?: 'default' | 'campaign_manager' | 'data_analyst', maxRetries?: number): Promise<ChatResponse>;
    resetThread(): void;
    private sleep;
}
export { BayEngageAgentClient };
export type { ChatRequest, ChatResponse };
//# sourceMappingURL=typescript-examples.d.ts.map
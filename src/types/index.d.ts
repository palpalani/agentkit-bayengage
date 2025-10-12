export interface BayEngageConfig {
    apiKey: string;
    apiSecret?: string;
    baseURL: string;
    timeout?: number;
    maxRetries?: number;
}
export interface APIResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    meta?: {
        requestId?: string;
        timestamp: string;
    };
}
export interface Contact {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    tags?: string[];
    customFields?: Record<string, any>;
    listIds?: string[];
    subscriptionStatus?: 'subscribed' | 'unsubscribed' | 'pending';
    createdAt?: string;
    updatedAt?: string;
}
export interface Segment {
    id: string;
    name: string;
    description?: string;
    contactCount: number;
    conditions?: any;
    createdAt: string;
    updatedAt: string;
}
export interface Campaign {
    id?: string;
    name: string;
    subject: string;
    previewText?: string;
    fromName: string;
    fromEmail: string;
    replyTo?: string;
    templateId?: string;
    htmlContent?: string;
    segmentIds?: string[];
    listIds?: string[];
    scheduledAt?: string;
    status?: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
    type?: 'regular' | 'automated' | 'ab_test';
    createdAt?: string;
    updatedAt?: string;
}
export interface CampaignStats {
    campaignId: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    unsubscribeRate: number;
    revenue?: number;
    topLinks?: {
        url: string;
        clicks: number;
    }[];
}
export interface Template {
    id?: string;
    name: string;
    subject?: string;
    htmlContent: string;
    category?: string;
    thumbnailUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface DripCampaign {
    id?: string;
    name: string;
    description?: string;
    triggerType: 'signup' | 'purchase' | 'abandoned_cart' | 'custom';
    emails: {
        delay: number;
        delayUnit: 'minutes' | 'hours' | 'days';
        templateId: string;
        subject: string;
    }[];
    status?: 'active' | 'paused' | 'draft';
    createdAt?: string;
    updatedAt?: string;
}
export interface ABTestCampaign {
    id?: string;
    name: string;
    testType: 'subject' | 'content' | 'send_time';
    variants: {
        name: string;
        subject?: string;
        templateId?: string;
        percentage: number;
    }[];
    winnerMetric: 'open_rate' | 'click_rate' | 'conversion_rate';
    testDuration: number;
    segmentIds: string[];
    status?: 'draft' | 'testing' | 'completed';
    winnerId?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Newsletter {
    id?: string;
    name: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    sendDay?: string;
    sendTime?: string;
    templateId: string;
    segmentIds: string[];
    status?: 'active' | 'paused';
    lastSent?: string;
    createdAt?: string;
    updatedAt?: string;
}
//# sourceMappingURL=index.d.ts.map
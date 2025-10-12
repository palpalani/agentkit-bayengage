import { z } from 'zod';
export declare const createDripCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    triggerType: z.ZodEnum<["signup", "purchase", "abandoned_cart", "custom"]>;
    emails: z.ZodArray<z.ZodObject<{
        delay: z.ZodNumber;
        delayUnit: z.ZodEnum<["minutes", "hours", "days"]>;
        templateId: z.ZodString;
        subject: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        subject: string;
        templateId: string;
        delay: number;
        delayUnit: "minutes" | "hours" | "days";
    }, {
        subject: string;
        templateId: string;
        delay: number;
        delayUnit: "minutes" | "hours" | "days";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    triggerType: "custom" | "signup" | "purchase" | "abandoned_cart";
    emails: {
        subject: string;
        templateId: string;
        delay: number;
        delayUnit: "minutes" | "hours" | "days";
    }[];
    description?: string | undefined;
}, {
    name: string;
    triggerType: "custom" | "signup" | "purchase" | "abandoned_cart";
    emails: {
        subject: string;
        templateId: string;
        delay: number;
        delayUnit: "minutes" | "hours" | "days";
    }[];
    description?: string | undefined;
}>, string>;
export declare const activateDripCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    dripCampaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    dripCampaignId: string;
}, {
    dripCampaignId: string;
}>, string>;
export declare const createABTestCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    name: z.ZodString;
    testType: z.ZodEnum<["subject", "content", "send_time"]>;
    variants: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        subject: z.ZodOptional<z.ZodString>;
        templateId: z.ZodOptional<z.ZodString>;
        percentage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        percentage: number;
        subject?: string | undefined;
        templateId?: string | undefined;
    }, {
        name: string;
        percentage: number;
        subject?: string | undefined;
        templateId?: string | undefined;
    }>, "many">;
    winnerMetric: z.ZodEnum<["open_rate", "click_rate", "conversion_rate"]>;
    testDuration: z.ZodNumber;
    segmentIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    segmentIds: string[];
    testType: "subject" | "content" | "send_time";
    variants: {
        name: string;
        percentage: number;
        subject?: string | undefined;
        templateId?: string | undefined;
    }[];
    winnerMetric: "open_rate" | "click_rate" | "conversion_rate";
    testDuration: number;
}, {
    name: string;
    segmentIds: string[];
    testType: "subject" | "content" | "send_time";
    variants: {
        name: string;
        percentage: number;
        subject?: string | undefined;
        templateId?: string | undefined;
    }[];
    winnerMetric: "open_rate" | "click_rate" | "conversion_rate";
    testDuration: number;
}>, string>;
export declare const startABTestTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    abTestId: z.ZodString;
    confirmStart: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    abTestId: string;
    confirmStart: boolean;
}, {
    abTestId: string;
    confirmStart?: boolean | undefined;
}>, string>;
export declare const createNewsletterTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    name: z.ZodString;
    frequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
    sendDay: z.ZodOptional<z.ZodString>;
    sendTime: z.ZodString;
    templateId: z.ZodString;
    segmentIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    templateId: string;
    segmentIds: string[];
    frequency: "daily" | "weekly" | "monthly";
    sendTime: string;
    sendDay?: string | undefined;
}, {
    name: string;
    templateId: string;
    segmentIds: string[];
    frequency: "daily" | "weekly" | "monthly";
    sendTime: string;
    sendDay?: string | undefined;
}>, string>;
export declare const pauseNewsletterTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    newsletterId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newsletterId: string;
}, {
    newsletterId: string;
}>, string>;
export declare const listDripCampaignsTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["active", "paused", "draft"]>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    status?: "draft" | "paused" | "active" | undefined;
}, {
    status?: "draft" | "paused" | "active" | undefined;
    limit?: number | undefined;
}>, string>;
//# sourceMappingURL=automation.d.ts.map
import { z } from 'zod';
export declare const listSegmentsTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
}>, string>;
export declare const createCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    name: z.ZodString;
    subject: z.ZodString;
    previewText: z.ZodOptional<z.ZodString>;
    fromName: z.ZodString;
    fromEmail: z.ZodString;
    replyTo: z.ZodOptional<z.ZodString>;
    templateId: z.ZodOptional<z.ZodString>;
    htmlContent: z.ZodOptional<z.ZodString>;
    segmentIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    listIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    subject: string;
    name: string;
    fromName: string;
    fromEmail: string;
    listIds?: string[] | undefined;
    previewText?: string | undefined;
    replyTo?: string | undefined;
    templateId?: string | undefined;
    htmlContent?: string | undefined;
    segmentIds?: string[] | undefined;
}, {
    subject: string;
    name: string;
    fromName: string;
    fromEmail: string;
    listIds?: string[] | undefined;
    previewText?: string | undefined;
    replyTo?: string | undefined;
    templateId?: string | undefined;
    htmlContent?: string | undefined;
    segmentIds?: string[] | undefined;
}>, string>;
export declare const sendCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    campaignId: z.ZodString;
    scheduledAt: z.ZodOptional<z.ZodString>;
    confirmSend: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
    confirmSend: boolean;
    scheduledAt?: string | undefined;
}, {
    campaignId: string;
    scheduledAt?: string | undefined;
    confirmSend?: boolean | undefined;
}>, string>;
export declare const getCampaignStatsTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>, string>;
export declare const listCampaignsTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["draft", "scheduled", "sending", "sent", "paused", "cancelled"]>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    status?: "draft" | "scheduled" | "sending" | "sent" | "paused" | "cancelled" | undefined;
}, {
    status?: "draft" | "scheduled" | "sending" | "sent" | "paused" | "cancelled" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>, string>;
export declare const deleteCampaignTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>, string>;
//# sourceMappingURL=campaigns.d.ts.map
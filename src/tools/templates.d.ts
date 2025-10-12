import { z } from 'zod';
export declare const listTemplatesTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    category?: string | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    category?: string | undefined;
}>, string>;
export declare const getTemplateTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    templateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateId: string;
}, {
    templateId: string;
}>, string>;
export declare const createTemplateTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    name: z.ZodString;
    subject: z.ZodOptional<z.ZodString>;
    htmlContent: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    htmlContent: string;
    subject?: string | undefined;
    category?: string | undefined;
}, {
    name: string;
    htmlContent: string;
    subject?: string | undefined;
    category?: string | undefined;
}>, string>;
export declare const updateTemplateTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    templateId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    subject: z.ZodOptional<z.ZodString>;
    htmlContent: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    templateId: string;
    subject?: string | undefined;
    name?: string | undefined;
    htmlContent?: string | undefined;
    category?: string | undefined;
}, {
    templateId: string;
    subject?: string | undefined;
    name?: string | undefined;
    htmlContent?: string | undefined;
    category?: string | undefined;
}>, string>;
export declare const deleteTemplateTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    templateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateId: string;
}, {
    templateId: string;
}>, string>;
//# sourceMappingURL=templates.d.ts.map
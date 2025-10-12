import { z } from 'zod';
export declare const createContactTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    listIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    tags?: string[] | undefined;
    customFields?: Record<string, any> | undefined;
    listIds?: string[] | undefined;
}, {
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    tags?: string[] | undefined;
    customFields?: Record<string, any> | undefined;
    listIds?: string[] | undefined;
}>, string>;
export declare const updateContactTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    contactId: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    subscriptionStatus: z.ZodOptional<z.ZodEnum<["subscribed", "unsubscribed", "pending"]>>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    tags?: string[] | undefined;
    customFields?: Record<string, any> | undefined;
    contactId?: string | undefined;
    subscriptionStatus?: "subscribed" | "unsubscribed" | "pending" | undefined;
}, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    tags?: string[] | undefined;
    customFields?: Record<string, any> | undefined;
    contactId?: string | undefined;
    subscriptionStatus?: "subscribed" | "unsubscribed" | "pending" | undefined;
}>, string>;
export declare const getContactTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    contactId: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    contactId?: string | undefined;
}, {
    email?: string | undefined;
    contactId?: string | undefined;
}>, string>;
export declare const deleteContactTool: import("@openai/agents").FunctionTool<unknown, z.ZodObject<{
    contactId: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    contactId?: string | undefined;
}, {
    email?: string | undefined;
    contactId?: string | undefined;
}>, string>;
//# sourceMappingURL=contacts.d.ts.map
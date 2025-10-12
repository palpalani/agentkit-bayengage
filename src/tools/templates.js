import { tool } from '@openai/agents';
import { z } from 'zod';
import { getBayEngageClient } from '../client.js';
export const listTemplatesTool = tool({
    name: 'bayengage_list_templates',
    description: 'List all email templates available in BayEngage.',
    parameters: z.object({
        category: z.string().optional().describe('Filter templates by category'),
        limit: z.number().optional().default(50).describe('Maximum number of templates to return'),
        offset: z.number().optional().default(0).describe('Number of templates to skip'),
    }),
    async execute(input) {
        const client = getBayEngageClient();
        let endpoint = `/templates?limit=${input.limit}&offset=${input.offset}`;
        if (input.category) {
            endpoint += `&category=${encodeURIComponent(input.category)}`;
        }
        const response = await client.get(endpoint);
        if (response.status === 'error') {
            return {
                success: false,
                error: response.error?.message || 'Failed to list templates',
                details: response.error,
            };
        }
        return {
            success: true,
            templates: response.data?.templates || [],
            total: response.data?.total || 0,
            message: `Retrieved ${response.data?.templates?.length || 0} templates`,
        };
    },
});
export const getTemplateTool = tool({
    name: 'bayengage_get_template',
    description: 'Get details of a specific email template including its HTML content.',
    parameters: z.object({
        templateId: z.string().describe('Template ID to retrieve'),
    }),
    async execute(input) {
        const client = getBayEngageClient();
        const response = await client.get(`/templates/${input.templateId}`);
        if (response.status === 'error') {
            return {
                success: false,
                error: response.error?.message || 'Failed to retrieve template',
                details: response.error,
            };
        }
        return {
            success: true,
            template: {
                id: response.data?.id,
                name: response.data?.name,
                subject: response.data?.subject,
                htmlContent: response.data?.htmlContent,
                category: response.data?.category,
                thumbnailUrl: response.data?.thumbnailUrl,
                createdAt: response.data?.createdAt,
                updatedAt: response.data?.updatedAt,
            },
        };
    },
});
export const createTemplateTool = tool({
    name: 'bayengage_create_template',
    description: 'Create a new email template in BayEngage.',
    parameters: z.object({
        name: z.string().describe('Template name'),
        subject: z.string().optional().describe('Default subject line'),
        htmlContent: z.string().describe('HTML content of the template'),
        category: z.string().optional().describe('Template category for organization'),
    }),
    async execute(input) {
        const client = getBayEngageClient();
        const response = await client.post('/templates', {
            name: input.name,
            subject: input.subject,
            html_content: input.htmlContent,
            category: input.category,
        });
        if (response.status === 'error') {
            return {
                success: false,
                error: response.error?.message || 'Failed to create template',
                details: response.error,
            };
        }
        return {
            success: true,
            template: {
                id: response.data?.id,
                name: response.data?.name,
            },
            message: `Template "${input.name}" created successfully`,
        };
    },
});
export const updateTemplateTool = tool({
    name: 'bayengage_update_template',
    description: 'Update an existing email template.',
    parameters: z.object({
        templateId: z.string().describe('Template ID to update'),
        name: z.string().optional().describe('Updated template name'),
        subject: z.string().optional().describe('Updated subject line'),
        htmlContent: z.string().optional().describe('Updated HTML content'),
        category: z.string().optional().describe('Updated category'),
    }),
    async execute(input) {
        const client = getBayEngageClient();
        const updateData = {};
        if (input.name)
            updateData.name = input.name;
        if (input.subject)
            updateData.subject = input.subject;
        if (input.htmlContent)
            updateData.html_content = input.htmlContent;
        if (input.category)
            updateData.category = input.category;
        const response = await client.patch(`/templates/${input.templateId}`, updateData);
        if (response.status === 'error') {
            return {
                success: false,
                error: response.error?.message || 'Failed to update template',
                details: response.error,
            };
        }
        return {
            success: true,
            template: {
                id: response.data?.id,
                name: response.data?.name,
            },
            message: 'Template updated successfully',
        };
    },
});
export const deleteTemplateTool = tool({
    name: 'bayengage_delete_template',
    description: 'Delete an email template from BayEngage.',
    parameters: z.object({
        templateId: z.string().describe('Template ID to delete'),
    }),
    async execute(input) {
        const client = getBayEngageClient();
        const response = await client.delete(`/templates/${input.templateId}`);
        if (response.status === 'error') {
            return {
                success: false,
                error: response.error?.message || 'Failed to delete template',
                details: response.error,
            };
        }
        return {
            success: true,
            message: 'Template deleted successfully',
        };
    },
});
//# sourceMappingURL=templates.js.map
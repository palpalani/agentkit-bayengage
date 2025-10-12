import { tool } from '@openai/agents';
import { z } from 'zod';
import { getBayEngageClient } from '../client.js';
import type { Contact, APIResponse } from '../types/index.js';

export const createContactTool = tool({
  name: 'bayengage_create_contact',
  description: 'Create a new contact in BayEngage. Use this to add subscribers to your email list with their profile information.',
  parameters: z.object({
    email: z.string().email().describe('Contact email address (required)'),
    firstName: z.string().optional().describe('Contact first name'),
    lastName: z.string().optional().describe('Contact last name'),
    phone: z.string().optional().describe('Contact phone number'),
    tags: z.array(z.string()).optional().describe('Tags to apply to the contact'),
    customFields: z.record(z.any()).optional().describe('Custom field values as key-value pairs'),
    listIds: z.array(z.string()).optional().describe('List IDs to subscribe the contact to'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.post<Contact>('/contacts', {
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      phone: input.phone,
      tags: input.tags,
      custom_fields: input.customFields,
      list_ids: input.listIds,
      subscription_status: 'subscribed',
    });

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to create contact',
        details: response.error,
      };
    }

    return {
      success: true,
      contact: {
        id: response.data?.id,
        email: response.data?.email,
        firstName: response.data?.first_name,
        lastName: response.data?.last_name,
        subscriptionStatus: response.data?.subscription_status,
      },
      message: `Contact ${input.email} created successfully`,
    };
  },
});

export const updateContactTool = tool({
  name: 'bayengage_update_contact',
  description: 'Update an existing contact in BayEngage by email or contact ID. Use this to modify contact information or subscription status.',
  parameters: z.object({
    contactId: z.string().optional().describe('Contact ID to update'),
    email: z.string().email().optional().describe('Contact email to lookup and update'),
    firstName: z.string().optional().describe('Updated first name'),
    lastName: z.string().optional().describe('Updated last name'),
    phone: z.string().optional().describe('Updated phone number'),
    tags: z.array(z.string()).optional().describe('Updated tags'),
    customFields: z.record(z.any()).optional().describe('Updated custom fields'),
    subscriptionStatus: z.enum(['subscribed', 'unsubscribed', 'pending']).optional().describe('Updated subscription status'),
  }),
  async execute(input) {
    if (!input.contactId && !input.email) {
      return {
        success: false,
        error: 'Either contactId or email must be provided',
      };
    }

    const client = getBayEngageClient();

    const endpoint = input.contactId
      ? `/contacts/${input.contactId}`
      : `/contacts/by-email/${encodeURIComponent(input.email!)}`;

    const updateData: any = {};
    if (input.firstName) updateData.first_name = input.firstName;
    if (input.lastName) updateData.last_name = input.lastName;
    if (input.phone) updateData.phone = input.phone;
    if (input.tags) updateData.tags = input.tags;
    if (input.customFields) updateData.custom_fields = input.customFields;
    if (input.subscriptionStatus) updateData.subscription_status = input.subscriptionStatus;

    const response = await client.patch<Contact>(endpoint, updateData);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to update contact',
        details: response.error,
      };
    }

    return {
      success: true,
      contact: {
        id: response.data?.id,
        email: response.data?.email,
        firstName: response.data?.first_name,
        lastName: response.data?.last_name,
        subscriptionStatus: response.data?.subscription_status,
      },
      message: 'Contact updated successfully',
    };
  },
});

export const getContactTool = tool({
  name: 'bayengage_get_contact',
  description: 'Retrieve contact information from BayEngage by email or contact ID.',
  parameters: z.object({
    contactId: z.string().optional().describe('Contact ID to retrieve'),
    email: z.string().email().optional().describe('Contact email to lookup'),
  }),
  async execute(input) {
    if (!input.contactId && !input.email) {
      return {
        success: false,
        error: 'Either contactId or email must be provided',
      };
    }

    const client = getBayEngageClient();

    const endpoint = input.contactId
      ? `/contacts/${input.contactId}`
      : `/contacts/by-email/${encodeURIComponent(input.email!)}`;

    const response = await client.get<Contact>(endpoint);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to retrieve contact',
        details: response.error,
      };
    }

    return {
      success: true,
      contact: {
        id: response.data?.id,
        email: response.data?.email,
        firstName: response.data?.first_name,
        lastName: response.data?.last_name,
        phone: response.data?.phone,
        tags: response.data?.tags,
        subscriptionStatus: response.data?.subscription_status,
        customFields: response.data?.custom_fields,
        createdAt: response.data?.created_at,
        updatedAt: response.data?.updated_at,
      },
    };
  },
});

export const deleteContactTool = tool({
  name: 'bayengage_delete_contact',
  description: 'Permanently delete a contact from BayEngage. Use with caution as this action cannot be undone.',
  parameters: z.object({
    contactId: z.string().optional().describe('Contact ID to delete'),
    email: z.string().email().optional().describe('Contact email to delete'),
  }),
  async execute(input) {
    if (!input.contactId && !input.email) {
      return {
        success: false,
        error: 'Either contactId or email must be provided',
      };
    }

    const client = getBayEngageClient();

    const endpoint = input.contactId
      ? `/contacts/${input.contactId}`
      : `/contacts/by-email/${encodeURIComponent(input.email!)}`;

    const response = await client.delete(endpoint);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to delete contact',
        details: response.error,
      };
    }

    return {
      success: true,
      message: `Contact deleted successfully`,
    };
  },
});

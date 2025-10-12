import { tool } from '@openai/agents';
import { z } from 'zod';
import { bayengageClient } from '../client';

export const createContactTool = tool({
  name: 'bayengage_create_contact',
  description: 'Create or update a contact in BayEngage',
  parameters: z.object({
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    listIds: z.array(z.string()).optional(),
  }),
  async execute(input) {
    const resp = await bayengageClient.post('/contacts', { /* map input */ });
    return { contactId: resp.data.id, status: resp.data.status };
  },
});
import { tool } from '@openai/agents';
import { z } from 'zod';
import { getBayEngageClient } from '../client.js';
import type { ABTestCampaign, DripCampaign, Newsletter } from '../types/index.js';

export const createDripCampaignTool = tool({
  name: 'bayengage_create_drip_campaign',
  description:
    'Create an automated drip campaign that sends a series of emails over time based on a trigger event.',
  parameters: z.object({
    name: z.string().describe('Drip campaign name'),
    description: z.string().optional().describe('Campaign description'),
    triggerType: z
      .enum(['signup', 'purchase', 'abandoned_cart', 'custom'])
      .describe('Event that triggers the campaign'),
    emails: z
      .array(
        z.object({
          delay: z.number().describe('Delay amount before sending'),
          delayUnit: z.enum(['minutes', 'hours', 'days']).describe('Delay time unit'),
          templateId: z.string().describe('Template ID to use'),
          subject: z.string().describe('Email subject line'),
        })
      )
      .describe('Series of emails in the drip sequence'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.post<DripCampaign>('/automation/drip-campaigns', {
      name: input.name,
      description: input.description,
      trigger_type: input.triggerType,
      emails: input.emails.map((email) => ({
        delay: email.delay,
        delay_unit: email.delayUnit,
        template_id: email.templateId,
        subject: email.subject,
      })),
      status: 'draft',
    });

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to create drip campaign',
        details: response.error,
      };
    }

    return {
      success: true,
      dripCampaign: {
        id: response.data?.id,
        name: response.data?.name,
        status: response.data?.status,
        emailCount: input.emails.length,
      },
      message: `Drip campaign "${input.name}" created with ${input.emails.length} emails`,
    };
  },
});

export const activateDripCampaignTool = tool({
  name: 'bayengage_activate_drip_campaign',
  description:
    'Activate a drip campaign to start automatically sending emails when the trigger event occurs.',
  parameters: z.object({
    dripCampaignId: z.string().describe('Drip campaign ID to activate'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.patch<DripCampaign>(
      `/automation/drip-campaigns/${input.dripCampaignId}/activate`,
      { status: 'active' }
    );

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to activate drip campaign',
        details: response.error,
      };
    }

    return {
      success: true,
      dripCampaign: {
        id: response.data?.id,
        status: response.data?.status,
      },
      message: 'Drip campaign activated successfully',
    };
  },
});

export const createABTestCampaignTool = tool({
  name: 'bayengage_create_ab_test',
  description:
    'Create an A/B test campaign to test different variations and automatically send the winner.',
  parameters: z.object({
    name: z.string().describe('A/B test campaign name'),
    testType: z.enum(['subject', 'content', 'send_time']).describe('What to test'),
    variants: z
      .array(
        z.object({
          name: z.string().describe('Variant name (e.g., "Variant A")'),
          subject: z.string().optional().describe('Subject line for this variant'),
          templateId: z.string().optional().describe('Template ID for this variant'),
          percentage: z
            .number()
            .min(0)
            .max(100)
            .describe('Percentage of audience for this variant'),
        })
      )
      .min(2)
      .describe('Test variants (minimum 2)'),
    winnerMetric: z
      .enum(['open_rate', 'click_rate', 'conversion_rate'])
      .describe('Metric to determine winner'),
    testDuration: z.number().describe('Test duration in hours before sending winner'),
    segmentIds: z.array(z.string()).describe('Segments to send test to'),
  }),
  async execute(input) {
    const totalPercentage = input.variants.reduce((sum, v) => sum + v.percentage, 0);
    if (totalPercentage > 100) {
      return {
        success: false,
        error: 'Total percentage across variants cannot exceed 100%',
      };
    }

    const client = getBayEngageClient();

    const response = await client.post<ABTestCampaign>('/campaigns/ab-tests', {
      name: input.name,
      test_type: input.testType,
      variants: input.variants.map((v) => ({
        name: v.name,
        subject: v.subject,
        template_id: v.templateId,
        percentage: v.percentage,
      })),
      winner_metric: input.winnerMetric,
      test_duration: input.testDuration,
      segment_ids: input.segmentIds,
      status: 'draft',
    });

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to create A/B test',
        details: response.error,
      };
    }

    return {
      success: true,
      abTest: {
        id: response.data?.id,
        name: response.data?.name,
        status: response.data?.status,
        variantCount: input.variants.length,
      },
      message: `A/B test "${input.name}" created with ${input.variants.length} variants`,
    };
  },
});

export const startABTestTool = tool({
  name: 'bayengage_start_ab_test',
  description:
    'Start an A/B test campaign. The test will run for the specified duration, then send the winner to remaining contacts.',
  parameters: z.object({
    abTestId: z.string().describe('A/B test campaign ID'),
    confirmStart: z.boolean().default(false).describe('Explicit confirmation to start test'),
  }),
  async execute(input) {
    if (!input.confirmStart) {
      return {
        success: false,
        error: 'A/B test start not confirmed. Set confirmStart to true to proceed.',
      };
    }

    const client = getBayEngageClient();

    const response = await client.patch<ABTestCampaign>(
      `/campaigns/ab-tests/${input.abTestId}/start`,
      { status: 'testing' }
    );

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to start A/B test',
        details: response.error,
      };
    }

    return {
      success: true,
      abTest: {
        id: response.data?.id,
        status: response.data?.status,
      },
      message: 'A/B test started. Winner will be automatically sent after test duration.',
    };
  },
});

export const createNewsletterTool = tool({
  name: 'bayengage_create_newsletter',
  description: 'Create a recurring newsletter automation that sends on a regular schedule.',
  parameters: z.object({
    name: z.string().describe('Newsletter name'),
    frequency: z.enum(['daily', 'weekly', 'monthly']).describe('Send frequency'),
    sendDay: z
      .string()
      .optional()
      .describe('Day to send (for weekly/monthly, e.g., "Monday" or "1")'),
    sendTime: z.string().describe('Time to send in HH:MM format (24-hour)'),
    templateId: z.string().describe('Template ID to use'),
    segmentIds: z.array(z.string()).describe('Segments to send to'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.post<Newsletter>('/automation/newsletters', {
      name: input.name,
      frequency: input.frequency,
      send_day: input.sendDay,
      send_time: input.sendTime,
      template_id: input.templateId,
      segment_ids: input.segmentIds,
      status: 'active',
    });

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to create newsletter',
        details: response.error,
      };
    }

    return {
      success: true,
      newsletter: {
        id: response.data?.id,
        name: response.data?.name,
        frequency: response.data?.frequency,
        status: response.data?.status,
      },
      message: `Newsletter "${input.name}" created and activated with ${input.frequency} frequency`,
    };
  },
});

export const pauseNewsletterTool = tool({
  name: 'bayengage_pause_newsletter',
  description: 'Pause a recurring newsletter automation.',
  parameters: z.object({
    newsletterId: z.string().describe('Newsletter ID to pause'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.patch<Newsletter>(
      `/automation/newsletters/${input.newsletterId}`,
      { status: 'paused' }
    );

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to pause newsletter',
        details: response.error,
      };
    }

    return {
      success: true,
      newsletter: {
        id: response.data?.id,
        status: response.data?.status,
      },
      message: 'Newsletter paused successfully',
    };
  },
});

export const listDripCampaignsTool = tool({
  name: 'bayengage_list_drip_campaigns',
  description: 'List all drip campaigns in BayEngage.',
  parameters: z.object({
    status: z.enum(['active', 'paused', 'draft']).optional().describe('Filter by status'),
    limit: z.number().optional().default(50).describe('Maximum number to return'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    let endpoint = `/automation/drip-campaigns?limit=${input.limit}`;
    if (input.status) {
      endpoint += `&status=${input.status}`;
    }

    const response = await client.get<{ dripCampaigns: DripCampaign[]; total: number }>(endpoint);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to list drip campaigns',
        details: response.error,
      };
    }

    return {
      success: true,
      dripCampaigns: response.data?.dripCampaigns || [],
      total: response.data?.total || 0,
      message: `Retrieved ${response.data?.dripCampaigns?.length || 0} drip campaigns`,
    };
  },
});

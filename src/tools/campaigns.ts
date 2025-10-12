import { tool } from '@openai/agents';
import { z } from 'zod';
import { getBayEngageClient } from '../client.js';
import type { Campaign, CampaignStats, Segment } from '../types/index.js';

export const listSegmentsTool = tool({
  name: 'bayengage_list_segments',
  description: 'List all available segments in BayEngage. Segments are groups of contacts based on specific criteria.',
  parameters: z.object({
    limit: z.number().optional().default(50).describe('Maximum number of segments to return'),
    offset: z.number().optional().default(0).describe('Number of segments to skip'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.get<{ segments: Segment[]; total: number }>(
      `/segments?limit=${input.limit}&offset=${input.offset}`
    );

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to list segments',
        details: response.error,
      };
    }

    return {
      success: true,
      segments: response.data?.segments || [],
      total: response.data?.total || 0,
      message: `Retrieved ${response.data?.segments?.length || 0} segments`,
    };
  },
});

export const createCampaignTool = tool({
  name: 'bayengage_create_campaign',
  description: 'Create a new email campaign draft in BayEngage. This does NOT send the campaign - use send_campaign for that.',
  parameters: z.object({
    name: z.string().describe('Campaign name for internal reference'),
    subject: z.string().describe('Email subject line'),
    previewText: z.string().optional().describe('Preview text shown in inbox'),
    fromName: z.string().describe('Sender name'),
    fromEmail: z.string().email().describe('Sender email address'),
    replyTo: z.string().email().optional().describe('Reply-to email address'),
    templateId: z.string().optional().describe('Template ID to use for the campaign'),
    htmlContent: z.string().optional().describe('HTML content (if not using template)'),
    segmentIds: z.array(z.string()).optional().describe('Segment IDs to send to'),
    listIds: z.array(z.string()).optional().describe('List IDs to send to'),
  }),
  async execute(input) {
    if (!input.templateId && !input.htmlContent) {
      return {
        success: false,
        error: 'Either templateId or htmlContent must be provided',
      };
    }

    const client = getBayEngageClient();

    const response = await client.post<Campaign>('/campaigns', {
      name: input.name,
      subject: input.subject,
      preview_text: input.previewText,
      from_name: input.fromName,
      from_email: input.fromEmail,
      reply_to: input.replyTo,
      template_id: input.templateId,
      html_content: input.htmlContent,
      segment_ids: input.segmentIds,
      list_ids: input.listIds,
      status: 'draft',
      type: 'regular',
    });

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to create campaign',
        details: response.error,
      };
    }

    return {
      success: true,
      campaign: {
        id: response.data?.id,
        name: response.data?.name,
        subject: response.data?.subject,
        status: response.data?.status,
      },
      message: `Campaign "${input.name}" created as draft. Use bayengage_send_campaign to send it.`,
      warning: 'Campaign created but NOT sent. Review and use send_campaign tool to send.',
    };
  },
});

export const sendCampaignTool = tool({
  name: 'bayengage_send_campaign',
  description: 'Send or schedule a campaign. IMPORTANT: This will send real emails. Always confirm with user before sending.',
  parameters: z.object({
    campaignId: z.string().describe('Campaign ID to send'),
    scheduledAt: z.string().optional().describe('ISO 8601 timestamp to schedule send (optional, sends immediately if not provided)'),
    confirmSend: z.boolean().default(false).describe('Explicit confirmation to send campaign (must be true)'),
  }),
  async execute(input) {
    if (!input.confirmSend) {
      return {
        success: false,
        error: 'Campaign send not confirmed. Set confirmSend to true to proceed.',
        warning: 'SAFETY: Campaign sending requires explicit confirmation to prevent accidental sends.',
      };
    }

    const client = getBayEngageClient();

    const payload: any = {
      status: input.scheduledAt ? 'scheduled' : 'sending',
    };

    if (input.scheduledAt) {
      payload.scheduled_at = input.scheduledAt;
    }

    const response = await client.patch<Campaign>(`/campaigns/${input.campaignId}/send`, payload);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to send campaign',
        details: response.error,
      };
    }

    return {
      success: true,
      campaign: {
        id: response.data?.id,
        status: response.data?.status,
        scheduledAt: response.data?.scheduledAt,
      },
      message: input.scheduledAt
        ? `Campaign scheduled for ${input.scheduledAt}`
        : 'Campaign is now sending',
    };
  },
});

export const getCampaignStatsTool = tool({
  name: 'bayengage_get_campaign_stats',
  description: 'Retrieve analytics and statistics for a sent campaign including opens, clicks, bounces, and conversions.',
  parameters: z.object({
    campaignId: z.string().describe('Campaign ID to get statistics for'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.get<CampaignStats>(`/campaigns/${input.campaignId}/stats`);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to retrieve campaign stats',
        details: response.error,
      };
    }

    const stats = response.data;

    return {
      success: true,
      stats: {
        campaignId: stats?.campaignId,
        sent: stats?.sent || 0,
        delivered: stats?.delivered || 0,
        opened: stats?.opened || 0,
        clicked: stats?.clicked || 0,
        bounced: stats?.bounced || 0,
        unsubscribed: stats?.unsubscribed || 0,
        openRate: stats?.openRate || 0,
        clickRate: stats?.clickRate || 0,
        bounceRate: stats?.bounceRate || 0,
        unsubscribeRate: stats?.unsubscribeRate || 0,
        revenue: stats?.revenue,
        topLinks: stats?.topLinks,
      },
      summary: `Campaign sent to ${stats?.sent || 0} contacts. Open rate: ${((stats?.openRate || 0) * 100).toFixed(1)}%, Click rate: ${((stats?.clickRate || 0) * 100).toFixed(1)}%`,
    };
  },
});

export const listCampaignsTool = tool({
  name: 'bayengage_list_campaigns',
  description: 'List all campaigns in BayEngage with optional filtering by status.',
  parameters: z.object({
    status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled']).optional().describe('Filter by campaign status'),
    limit: z.number().optional().default(50).describe('Maximum number of campaigns to return'),
    offset: z.number().optional().default(0).describe('Number of campaigns to skip'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    let endpoint = `/campaigns?limit=${input.limit}&offset=${input.offset}`;
    if (input.status) {
      endpoint += `&status=${input.status}`;
    }

    const response = await client.get<{ campaigns: Campaign[]; total: number }>(endpoint);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to list campaigns',
        details: response.error,
      };
    }

    return {
      success: true,
      campaigns: response.data?.campaigns || [],
      total: response.data?.total || 0,
      message: `Retrieved ${response.data?.campaigns?.length || 0} campaigns`,
    };
  },
});

export const deleteCampaignTool = tool({
  name: 'bayengage_delete_campaign',
  description: 'Delete a campaign. Only draft campaigns can be deleted. Sent campaigns cannot be removed.',
  parameters: z.object({
    campaignId: z.string().describe('Campaign ID to delete'),
  }),
  async execute(input) {
    const client = getBayEngageClient();

    const response = await client.delete(`/campaigns/${input.campaignId}`);

    if (response.status === 'error') {
      return {
        success: false,
        error: response.error?.message || 'Failed to delete campaign',
        details: response.error,
      };
    }

    return {
      success: true,
      message: 'Campaign deleted successfully',
    };
  },
});

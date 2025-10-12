import { Agent } from '@openai/agents';
import { createContactTool, sendCampaignTool, getCampaignStatsTool } from './tools/bayengage';

export const bayEngageAgent = new Agent({
  name: 'BayEngage Agent',
  instructions: `You are an assistant that can create contacts, send campaigns, and fetch analytics using BayEngage. Use the tools when needed.`,
  tools: [createContactTool, sendCampaignTool, getCampaignStatsTool /* etc */],
});
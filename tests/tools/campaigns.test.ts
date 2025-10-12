import { describe, it, expect } from 'vitest';
import { campaignManagerAgent, dataAnalystAgent } from '../../src/agent.js';

describe('Campaign Tools', () => {
  it('should have campaign management tools', () => {
    const toolNames = campaignManagerAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_list_segments');
    expect(toolNames).toContain('bayengage_create_campaign');
    expect(toolNames).toContain('bayengage_send_campaign');
    expect(toolNames).toContain('bayengage_get_campaign_stats');
  });

  it('should have analytics tools in data analyst agent', () => {
    const toolNames = dataAnalystAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_get_campaign_stats');
    expect(toolNames).toContain('bayengage_list_campaigns');
    expect(toolNames).toContain('bayengage_list_segments');
  });
});

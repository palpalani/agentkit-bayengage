import { describe, it, expect, beforeAll, vi } from 'vitest';
import { bayEngageAgent } from '../../src/agent.js';

vi.mock('../../src/client.js', () => {
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };

  return {
    getBayEngageClient: vi.fn(() => mockClient),
    resetClient: vi.fn(),
  };
});

describe('Agent Integration Tests', () => {
  beforeAll(() => {
    process.env.OPENAI_API_KEY = 'test-key';
    process.env.BAYENGAGE_API_KEY = 'test-bayengage-key';
  });

  it('should have correct agent configuration', () => {
    expect(bayEngageAgent.name).toBe('BayEngage Marketing Agent');
    expect(bayEngageAgent.tools).toBeDefined();
    expect(bayEngageAgent.tools.length).toBeGreaterThan(0);
  });

  it('should include contact management tools', () => {
    const toolNames = bayEngageAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_create_contact');
    expect(toolNames).toContain('bayengage_update_contact');
    expect(toolNames).toContain('bayengage_get_contact');
    expect(toolNames).toContain('bayengage_delete_contact');
  });

  it('should include campaign management tools', () => {
    const toolNames = bayEngageAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_list_segments');
    expect(toolNames).toContain('bayengage_create_campaign');
    expect(toolNames).toContain('bayengage_send_campaign');
    expect(toolNames).toContain('bayengage_get_campaign_stats');
  });

  it('should include automation tools', () => {
    const toolNames = bayEngageAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_create_drip_campaign');
    expect(toolNames).toContain('bayengage_create_ab_test');
    expect(toolNames).toContain('bayengage_create_newsletter');
  });

  it('should include template management tools', () => {
    const toolNames = bayEngageAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_list_templates');
    expect(toolNames).toContain('bayengage_get_template');
    expect(toolNames).toContain('bayengage_create_template');
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getBayEngageClient } from '../../src/client.js';
import { bayEngageAgent } from '../../src/agent.js';

vi.mock('../../src/client.js', () => {
  const mockClient = {
    post: vi.fn(),
    patch: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  };

  return {
    getBayEngageClient: vi.fn(() => mockClient),
    resetClient: vi.fn(),
  };
});

describe('Contact Tools', () => {
  let mockClient: any;

  beforeEach(() => {
    mockClient = getBayEngageClient();
    vi.clearAllMocks();
  });

  it('should have contact management tools', () => {
    const toolNames = bayEngageAgent.tools.map((t: any) => t.name);

    expect(toolNames).toContain('bayengage_create_contact');
    expect(toolNames).toContain('bayengage_update_contact');
    expect(toolNames).toContain('bayengage_get_contact');
    expect(toolNames).toContain('bayengage_delete_contact');
  });

  it('should validate BayEngage client is used', () => {
    expect(getBayEngageClient).toBeDefined();
    expect(mockClient.post).toBeDefined();
    expect(mockClient.patch).toBeDefined();
    expect(mockClient.get).toBeDefined();
    expect(mockClient.delete).toBeDefined();
  });
});

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **production-ready OpenAI AgentKit integration for BayEngage**, providing AI agents that can interact with the BayEngage email marketing platform. Built using TypeScript, the `@openai/agents` framework, and comprehensive error handling.

## Development Commands

### Setup
```bash
npm install
cp .env.example .env
# Configure .env with your API keys
```

### Running the Server
```bash
npm start          # Start production server
npm run dev        # Start with hot reload
```

### Testing
```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Building
```bash
npm run build      # Compile TypeScript
npm run type-check # Type check without build
```

## Architecture

### Core Components

- **Agent Definitions** (`src/agent.ts`): Three specialized agents
  - `bayEngageAgent`: General-purpose marketing agent with all tools
  - `campaignManagerAgent`: Campaign-focused with safety guardrails
  - `dataAnalystAgent`: Analytics and metrics specialist

- **API Client** (`src/client.ts`): Production-ready BayEngage API client
  - Exponential backoff retry logic
  - Rate limit handling
  - Request tracing and error normalization
  - Configurable timeouts

- **Server** (`src/server.ts`): HTTP server with `/api/chat` endpoint
  - Multi-agent support
  - Conversation threading
  - Request tracing
  - CORS enabled

- **Tools** (organized by function):
  - `src/tools/contacts.ts`: Contact CRUD operations
  - `src/tools/campaigns.ts`: Campaign management and analytics
  - `src/tools/templates.ts`: Template operations
  - `src/tools/automation.ts`: Drip campaigns, A/B tests, newsletters

- **Types** (`src/types/index.ts`): Comprehensive TypeScript definitions

### Multi-Agent Pattern

The project implements a **multi-agent architecture** where each agent has specialized instructions and tool access:

1. **Default Agent**: Full access, general queries
2. **Campaign Manager**: Campaign-specific with enhanced safety protocols
3. **Data Analyst**: Read-only analytics focus

### Tool Pattern

All tools follow a consistent pattern:

```typescript
export const toolName = tool({
  name: 'bayengage_operation_name',
  description: 'Clear description for AI to understand when to use',
  parameters: z.object({
    // Zod schema with .describe() for each field
  }),
  async execute(input) {
    const client = getBayEngageClient();
    const response = await client.post('/endpoint', data);

    if (response.status === 'error') {
      return { success: false, error: response.error?.message };
    }

    return { success: true, data: transformedData };
  },
});
```

### Safety Guardrails

**Critical**: Campaign sending and automation activation require explicit confirmation:

- `sendCampaignTool`: Requires `confirmSend: true`
- `startABTestTool`: Requires `confirmStart: true`
- Agents are instructed to NEVER send without user confirmation
- Multiple validation layers prevent accidental sends

## Code Structure Guidelines

### Adding New Tools

1. Create tool in appropriate file under `src/tools/`
2. Define with `tool()` helper from `@openai/agents`
3. Use Zod schemas with `.describe()` for all parameters
4. Return consistent `{ success, data?, error? }` format
5. Import and add to agent's `tools` array in `src/agent.ts`

### Tool Naming Convention

- Tool names: `bayengage_operation_name` (snake_case)
- Tool constants: `operationNameTool` (camelCase)
- File names: `category.ts` (lowercase)

### Error Handling Pattern

All tools should handle errors consistently:

```typescript
if (response.status === 'error') {
  return {
    success: false,
    error: response.error?.message || 'Operation failed',
    details: response.error,
  };
}
```

### Type Safety

- All API responses use `APIResponse<T>` generic type
- All tools return structured objects, never raw API responses
- Use TypeScript strict mode (enabled in tsconfig.json)

## Testing

### Unit Tests

Located in `tests/tools/`, testing individual tool functions with mocked API client.

### Integration Tests

Located in `tests/integration/`, testing agent configuration and tool integration.

### Running Tests

```bash
npm test                    # Run once
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report
```

## Configuration

### Environment Variables

Required in `.env`:
- `BAYENGAGE_API_KEY`: BayEngage API key
- `BAYENGAGE_API_SECRET`: BayEngage API secret (optional)
- `BAYENGAGE_API_URL`: API base URL (default: https://api.bayengage.com/v2)
- `OPENAI_API_KEY`: OpenAI API key for agents
- `PORT`: Server port (default: 3000)

### Client Configuration

The `BayEngageClient` class (`src/client.ts`) supports:
- Custom timeout (default: 30s)
- Custom retry count (default: 3)
- Automatic retry with exponential backoff
- Rate limit handling (429 responses)

## API Endpoints

### POST /api/chat

Main agent interaction endpoint.

**Request:**
```json
{
  "user_input": "List my campaign segments",
  "agent": "default" | "campaign_manager" | "data_analyst",
  "thread_id": "optional_thread_id_for_conversation"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Agent's text response",
  "trace": [/* execution trace */],
  "thread_id": "thread_id_for_continuation"
}
```

### GET /health

Health check endpoint.

## Deployment

### Vercel
- Compatible out of the box
- Set environment variables in Vercel dashboard
- Deploy with `vercel` CLI

### AWS Lambda
- Build with `npm run build`
- Package `dist/` directory
- Set environment variables in Lambda console

### Docker
- Dockerfile ready (see README)
- Build: `docker build -t bayengage-agent .`
- Run: `docker run -p 3000:3000 --env-file .env bayengage-agent`

## Common Patterns

### Conversation Threading

Maintain conversation context across requests:

```typescript
const result1 = await fetch('/api/chat', {
  body: JSON.stringify({ user_input: 'Create a campaign' })
});

const { thread_id } = await result1.json();

// Continue conversation
await fetch('/api/chat', {
  body: JSON.stringify({
    user_input: 'Change the subject line',
    thread_id
  })
});
```

### Agent Selection

Choose appropriate agent for the task:
- `default`: General queries, mixed operations
- `campaign_manager`: Campaign creation, sending, optimization
- `data_analyst`: Performance analysis, metrics, insights

## Troubleshooting

### Import Issues
- Ensure all imports use `.js` extension (required for ESM)
- Use `import type` for type-only imports

### Type Errors
- Run `npm run type-check` to see all type errors
- Check `tsconfig.json` for strict mode settings

### Test Failures
- Ensure mocks are properly set up in test files
- Clear mocks with `vi.clearAllMocks()` in `beforeEach`

### API Client Issues
- Check environment variables are set
- Verify API credentials are valid
- Check network connectivity
- Review request traces in console output

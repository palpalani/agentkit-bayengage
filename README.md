# BayEngage Agent Kit

A production-ready OpenAI Agent implementation for BayEngage email marketing automation, built with the `openai-agents-js` SDK.

## Features

- **Complete BayEngage API Integration** - Comprehensive tools for contacts, campaigns, templates, and automation
- **Multi-Agent Architecture** - Specialized agents for campaign management, data analysis, and general operations
- **Production-Ready** - Built-in error handling, retry logic, rate limiting, and request tracing
- **Type-Safe** - Full TypeScript implementation with Zod schema validation
- **Safety Guardrails** - Explicit confirmation required for sending campaigns and activating automation
- **Extensible** - Modular tool structure for easy customization and extension

## Quick Start

### Prerequisites

- Node.js 18+ or 20+
- BayEngage API credentials
- OpenAI API key

### Installation

```bash
npm install
```

### Configuration

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Configure your credentials in `.env`:

```env
BAYENGAGE_API_KEY=your_api_key_here
BAYENGAGE_API_SECRET=your_api_secret_here
BAYENGAGE_API_URL=https://api.bayengage.com/v2
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### Running the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

## 📚 Examples & Documentation

**New to AgentKit?** Start with our comprehensive examples:

- **[Example Library](./examples/README.md)** - Complete examples directory
- **[Prompt Examples](./examples/prompts/)** - Natural language examples for beginners
- **[API Examples](./examples/api/)** - cURL, TypeScript, Python integration
- **[Workflow Scenarios](./examples/workflows/)** - Complete marketing automation flows
- **[Postman Collection](./examples/api/postman-collection.json)** - Interactive API testing

### Quick Example

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "List all my campaign segments"
  }'
```

**More examples:**
- See [examples/prompts/01-getting-started.md](./examples/prompts/01-getting-started.md) for your first steps
- Check [examples/api/chat-requests.sh](./examples/api/chat-requests.sh) for ready-to-use cURL commands
- Explore [examples/workflows/](./examples/workflows/) for complete automation scenarios

## Usage

### REST API

#### Chat with the Agent

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "List all my campaign segments"
  }'
```

#### Use Specialized Agents

```bash
# Campaign Manager Agent
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign for Black Friday sale",
    "agent": "campaign_manager"
  }'

# Data Analyst Agent
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Analyze the performance of my last 5 campaigns",
    "agent": "data_analyst"
  }'
```

### Programmatic Usage

```typescript
import { bayEngageAgent } from './src/agent.js';

const stream = bayEngageAgent.run({
  prompt: 'Create a new contact with email john@example.com',
});

for await (const event of stream) {
  if (event.type === 'text_delta') {
    process.stdout.write(event.delta);
  }
}
```

## Available Agents

### 1. BayEngage Marketing Agent (default)

General-purpose agent with access to all BayEngage features.

**Capabilities:**
- Contact management (create, update, retrieve, delete)
- Campaign creation, sending, and analytics
- Template management
- Marketing automation (drip campaigns, A/B tests, newsletters)
- Segment management

### 2. Campaign Manager Agent

Specialized agent focused on campaign operations with enhanced safety protocols.

**Best for:**
- Creating and sending campaigns
- Campaign performance analysis
- Audience targeting and segmentation
- Send time optimization

### 3. Data Analyst Agent

Analytics-focused agent for metrics and insights.

**Best for:**
- Campaign performance analysis
- Trend identification
- ROI calculations
- Benchmarking and recommendations

## Available Tools

### Contact Management

| Tool | Description |
|------|-------------|
| `bayengage_create_contact` | Create new contact with profile info |
| `bayengage_update_contact` | Update existing contact details |
| `bayengage_get_contact` | Retrieve contact information |
| `bayengage_delete_contact` | Permanently delete a contact |

### Campaign Management

| Tool | Description |
|------|-------------|
| `bayengage_list_segments` | List all audience segments |
| `bayengage_create_campaign` | Create campaign draft |
| `bayengage_send_campaign` | Send or schedule campaign (requires confirmation) |
| `bayengage_get_campaign_stats` | Retrieve campaign analytics |
| `bayengage_list_campaigns` | List all campaigns |
| `bayengage_delete_campaign` | Delete campaign draft |

### Template Management

| Tool | Description |
|------|-------------|
| `bayengage_list_templates` | List all email templates |
| `bayengage_get_template` | Get template details |
| `bayengage_create_template` | Create new template |
| `bayengage_update_template` | Update existing template |
| `bayengage_delete_template` | Delete template |

### Marketing Automation

| Tool | Description |
|------|-------------|
| `bayengage_create_drip_campaign` | Create automated email sequence |
| `bayengage_activate_drip_campaign` | Activate drip campaign |
| `bayengage_create_ab_test` | Create A/B test campaign |
| `bayengage_start_ab_test` | Start A/B test (requires confirmation) |
| `bayengage_create_newsletter` | Create recurring newsletter |
| `bayengage_pause_newsletter` | Pause newsletter automation |
| `bayengage_list_drip_campaigns` | List all drip campaigns |

## Examples

### Create and Send a Campaign

```typescript
// 1. Create campaign draft
const createResult = await bayEngageAgent.run({
  prompt: `Create a campaign named "Summer Sale 2025" with subject
    "50% Off Everything!" using template template_123 for segment seg_456`
});

// 2. Review and confirm
// Agent will show campaign details and ask for confirmation

// 3. Send with confirmation
const sendResult = await bayEngageAgent.run({
  prompt: 'Yes, send the Summer Sale campaign now',
  threadId: createResult.threadId, // Continue conversation
});
```

### Analyze Campaign Performance

```typescript
const analysisResult = await dataAnalystAgent.run({
  prompt: `Analyze campaign campaign_789 and tell me:
    - How it performed vs benchmarks
    - What worked well
    - What can be improved
    - Specific recommendations for next campaign`
});
```

### Create Drip Campaign

```typescript
const dripResult = await bayEngageAgent.run({
  prompt: `Create a welcome drip campaign with 3 emails:
    1. Welcome email immediately using template welcome_1
    2. Product tour after 2 days using template tour_1
    3. Special offer after 5 days using template offer_1`
});
```

### Set Up A/B Test

```typescript
const abTestResult = await campaignManagerAgent.run({
  prompt: `Create an A/B test for subject lines:
    Variant A: "Last Chance - Sale Ends Tonight!"
    Variant B: "Don't Miss Out: Final Hours of Sale"
    Test 20% of audience, send winner based on open rate after 4 hours
    Send to segment vip_customers`
});
```

## Safety Features

### Campaign Send Protection

All campaign sending and automation activation requires **explicit confirmation**:

- Agent will show campaign details before sending
- User must explicitly confirm (e.g., "yes, send it")
- `confirmSend` parameter must be set to `true`
- Multiple safety checks prevent accidental sends

### Contact Deletion Warning

- Agent warns that deletion is permanent
- Requires explicit confirmation
- Cannot be undone

### Automation Activation

- Clear explanation of automation behavior
- Confirmation required for activation
- Easy pause/deactivation available

## Architecture

### Project Structure

```
agentkit-bayengage/
├── src/
│   ├── agent.ts              # Agent definitions
│   ├── client.ts             # BayEngage API client
│   ├── server.ts             # HTTP server
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── tools/
│       ├── contacts.ts       # Contact management tools
│       ├── campaigns.ts      # Campaign tools
│       ├── templates.ts      # Template tools
│       └── automation.ts     # Automation tools
├── tests/
│   ├── tools/                # Unit tests for tools
│   └── integration/          # Integration tests
├── .env.example              # Environment template
└── README.md
```

### API Client Features

- **Exponential Backoff Retry** - Automatic retry with jitter for failed requests
- **Rate Limit Handling** - Respects 429 responses and waits appropriately
- **Request Tracing** - Unique request IDs for debugging
- **Error Normalization** - Consistent error format across all responses
- **Timeout Management** - Configurable timeouts with sensible defaults

## Development

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Type Checking

```bash
npm run type-check
```

### Build

```bash
npm run build
```

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### AWS Lambda

1. Build the project:
```bash
npm run build
```

2. Package and deploy using your preferred Lambda deployment tool (Serverless Framework, AWS SAM, etc.)

3. Configure environment variables in Lambda console

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t bayengage-agent .
docker run -p 3000:3000 --env-file .env bayengage-agent
```

## API Reference

### Request Format

```typescript
interface ChatRequest {
  user_input: string;           // User's message/query
  agent?: 'default' | 'campaign_manager' | 'data_analyst';
  thread_id?: string;           // Continue existing conversation
}
```

### Response Format

```typescript
interface ChatResponse {
  success: boolean;
  response?: string;            // Agent's text response
  trace?: Array<{              // Execution trace
    type: string;
    timestamp: string;
    data: any;
  }>;
  error?: string;
  thread_id?: string;           // Thread ID for conversation continuity
}
```

## Best Practices

### 1. Always Test with Small Audiences First

```typescript
// Start with a small test segment
await bayEngageAgent.run({
  prompt: 'Send campaign to test_segment first'
});

// Review results, then send to full audience
```

### 2. Use Conversation Threading

```typescript
const result1 = await bayEngageAgent.run({
  prompt: 'Create a campaign for new product launch'
});

// Continue the conversation
const result2 = await bayEngageAgent.run({
  prompt: 'Actually, change the subject to "Introducing X"',
  threadId: result1.threadId
});
```

### 3. Leverage Specialized Agents

```typescript
// Use Campaign Manager for campaign operations
await campaignManagerAgent.run({
  prompt: 'Optimize send time for my next campaign'
});

// Use Data Analyst for insights
await dataAnalystAgent.run({
  prompt: 'What are my best performing campaigns?'
});
```

### 4. Monitor Tool Calls

```typescript
for await (const event of stream) {
  if (event.type === 'tool_call_start') {
    console.log(`Calling tool: ${event.toolName}`);
  }
  if (event.type === 'tool_call_result') {
    console.log(`Result:`, event.result);
  }
}
```

## Troubleshooting

### "Invalid API credentials"

- Verify `BAYENGAGE_API_KEY` in `.env`
- Check that API key has correct permissions
- Ensure API key is not expired

### "Rate limit exceeded"

- Client automatically retries with backoff
- Consider increasing delay between requests
- Check your BayEngage plan limits

### "Campaign send not confirmed"

- This is intentional safety feature
- User must explicitly confirm campaign sends
- Use "yes, send it" or similar confirmation phrase

### Agent not using correct tool

- Check agent instructions match your use case
- Use specialized agents for specific tasks
- Provide more specific prompts

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## License

ISC

## Support

For issues and questions:
- GitHub Issues: [agentkit-bayengage/issues](https://github.com/yourusername/agentkit-bayengage/issues)
- BayEngage API Docs: [developer.targetbay.com](https://developer.targetbay.com/bayengage/v2/)
- OpenAI Agents SDK: [github.com/openai/openai-agents-js](https://github.com/openai/openai-agents-js)

---

Built with ❤️ using OpenAI Agents SDK and BayEngage API

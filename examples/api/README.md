# API Examples

Programmatic examples for integrating BayEngage AgentKit into your applications.

## Quick Start

### Using cURL (Command Line)

See [chat-requests.sh](./chat-requests.sh) for ready-to-use cURL examples.

```bash
# Make executable
chmod +x examples/api/chat-requests.sh

# Run examples
./examples/api/chat-requests.sh
```

### Using TypeScript/Node.js

See [typescript-examples.ts](./typescript-examples.ts) for Node.js integration.

```bash
# Install dependencies (from project root)
npm install

# Run examples
npx tsx examples/api/typescript-examples.ts
```

### Using Python

See [python-client.py](./python-client.py) for Python integration.

```bash
# Install dependencies
pip install requests

# Run examples
python examples/api/python-client.py
```

### Using Postman

Import [postman-collection.json](./postman-collection.json) into Postman for interactive testing.

## API Endpoint

```
POST http://localhost:3000/api/chat
Content-Type: application/json

{
  "user_input": "Your prompt here",
  "agent": "default|campaign_manager|data_analyst",  // optional
  "thread_id": "thread_abc123"  // optional, for conversation threading
}
```

## Response Format

```json
{
  "success": true,
  "response": "Agent's text response",
  "trace": [
    {
      "type": "tool_call",
      "timestamp": "2025-01-15T10:00:00.000Z",
      "data": { "tool": "bayengage_list_segments" }
    }
  ],
  "thread_id": "thread_abc123"
}
```

## Examples by Use Case

### Contact Management
- Create contacts
- Update contact information
- Retrieve contact details
- Delete contacts

### Campaign Operations
- Create campaign drafts
- Schedule campaigns
- Send campaigns (with confirmation)
- Get campaign analytics

### Automation
- Set up drip campaigns
- Configure A/B tests
- Manage newsletters

### Analytics
- Get campaign stats
- Compare performance
- Get AI-powered insights

## Error Handling

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common errors:
- `400`: Invalid request (missing required fields)
- `401`: Authentication failed
- `404`: Resource not found
- `429`: Rate limit exceeded
- `500`: Server error

## Best Practices

1. **Use appropriate agent**:
   - `default`: General operations
   - `campaign_manager`: Campaign-focused tasks
   - `data_analyst`: Analytics and insights

2. **Handle conversation threading**:
   ```javascript
   const response1 = await chat("Create a campaign");
   const threadId = response1.thread_id;

   const response2 = await chat("Change the subject", threadId);
   ```

3. **Implement retry logic**:
   ```javascript
   async function chatWithRetry(prompt, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await chat(prompt);
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await sleep(1000 * Math.pow(2, i)); // Exponential backoff
       }
     }
   }
   ```

4. **Monitor API responses**:
   - Check `success` field
   - Parse `trace` for debugging
   - Store `thread_id` for multi-turn conversations

## Integration Patterns

### Webhook Handler
```typescript
app.post('/webhook/bayengage', async (req, res) => {
  const event = req.body;

  if (event.type === 'contact.created') {
    await chat(`Add contact ${event.data.email} to welcome drip campaign`);
  }

  res.status(200).send('OK');
});
```

### Scheduled Job
```typescript
cron.schedule('0 9 * * 1', async () => {
  // Every Monday at 9 AM
  await chat('Send weekly newsletter to active subscribers');
});
```

### User Dashboard
```typescript
async function getCampaignStats(campaignId) {
  const response = await chat(
    `Show stats for campaign ${campaignId}`,
    { agent: 'data_analyst' }
  );
  return parseStatsFromResponse(response.response);
}
```

## Rate Limits

- Default: 100 requests per minute
- Burst: 10 requests per second
- The AgentKit client handles rate limiting automatically with retries

## Support

For issues with the API:
- Check server logs
- Review [troubleshooting guide](../../README.md#troubleshooting)
- Open GitHub issue

---

Choose your integration method:
- **[cURL Examples](./chat-requests.sh)** - Command line testing
- **[TypeScript Examples](./typescript-examples.ts)** - Node.js integration
- **[Python Examples](./python-client.py)** - Python integration
- **[Postman Collection](./postman-collection.json)** - Interactive API testing

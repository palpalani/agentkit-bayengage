# Getting Started with BayEngage AgentKit

Welcome! This guide will walk you through your first interactions with the BayEngage AI Agent.

## Prerequisites

Make sure the AgentKit server is running:

```bash
npm start
# Server should be running at http://localhost:3000
```

## Your First Agent Interaction

### 1. Check Server Health

```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:00:00.000Z",
  "agents": ["default", "campaign_manager", "data_analyst"]
}
```

### 2. Simple Query - List Segments

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "List all my campaign segments"
  }'
```

**What the Agent Does:**
- Uses the `bayengage_list_segments` tool
- Retrieves all your audience segments
- Returns a formatted list

**Expected Response:**
```json
{
  "success": true,
  "response": "Here are your campaign segments:\n\n1. Active Customers (2,450 contacts)\n2. VIP Members (340 contacts)\n3. New Subscribers (1,200 contacts)\n...",
  "thread_id": "thread_abc123"
}
```

### 3. Get Contact Information

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Get contact information for john@example.com"
  }'
```

**What the Agent Does:**
- Uses the `bayengage_get_contact` tool
- Looks up contact by email
- Returns full contact details

### 4. Create a New Contact

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a new contact with email sarah@example.com, first name Sarah, last name Johnson"
  }'
```

**What the Agent Does:**
- Uses the `bayengage_create_contact` tool
- Creates contact in your BayEngage account
- Returns confirmation with contact ID

## Understanding Agent Responses

### Successful Response

```json
{
  "success": true,
  "response": "Contact created successfully! ID: contact_xyz789",
  "trace": [
    {
      "type": "tool_call",
      "timestamp": "2025-01-15T10:05:00.000Z",
      "data": { "tool": "bayengage_create_contact" }
    }
  ],
  "thread_id": "thread_abc123"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Contact with email sarah@example.com already exists"
}
```

## Using Different Agents

BayEngage AgentKit has three specialized agents:

### 1. Default Agent (General Purpose)

Use for general operations:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Show me my contact lists"
  }'
```

### 2. Campaign Manager Agent

Best for campaign operations:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign for our summer sale",
    "agent": "campaign_manager"
  }'
```

### 3. Data Analyst Agent

Best for analytics and insights:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "What are my best performing campaigns?",
    "agent": "data_analyst"
  }'
```

## Conversation Threading

Continue a conversation by including the `thread_id`:

```bash
# First message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign named Test Campaign"
  }'

# Response includes: "thread_id": "thread_abc123"

# Follow-up message (same conversation)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Change the name to Welcome Campaign",
    "thread_id": "thread_abc123"
  }'
```

## Common Prompts for Beginners

### Exploring Your Account

```
"What segments do I have?"
"List all my email templates"
"Show me my recent campaigns"
"How many contacts do I have?"
```

### Simple Operations

```
"Create a contact with email test@example.com"
"Update contact john@example.com with phone number 555-1234"
"Get information about campaign camp_123"
"Delete contact test@example.com"
```

### Getting Help

```
"What can you help me with?"
"Show me examples of creating campaigns"
"What tools do you have access to?"
"How do I send a campaign?"
```

## Tips for Success

### ✅ Good Prompts

- **Specific**: Include all required details
  ```
  "Create a contact with email sarah@example.com, first name Sarah, last name Johnson, and tag them as VIP"
  ```

- **Clear**: Use straightforward language
  ```
  "List all campaigns with status 'sent'"
  ```

- **Complete**: Provide necessary context
  ```
  "Get statistics for campaign camp_12345 from last month"
  ```

### ❌ Avoid These

- **Too Vague**:
  ```
  "Create something"
  ```

- **Missing Details**:
  ```
  "Create a campaign" (missing name, subject, template, etc.)
  ```

- **Ambiguous**:
  ```
  "Show me stuff"
  ```

## Safety Features

The agent has built-in safety features:

### 1. Confirmation Required for Sends

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Send campaign camp_123"
  }'
```

**Agent Response:**
```
"Campaign send requires explicit confirmation. Are you sure you want to send this campaign? Reply with 'yes, send it' to confirm."
```

### 2. Draft by Default

All campaigns are created as drafts:
```
"Campaign created as DRAFT. Review it before sending."
```

### 3. Deletion Warnings

```
"WARNING: Deleting a contact is permanent and cannot be undone. Are you sure?"
```

## Next Steps

Now that you're familiar with the basics, explore:

1. **[Contact Management](./02-contact-management.md)** - Learn advanced contact operations
2. **[Campaign Creation](./03-campaign-creation.md)** - Create your first email campaign
3. **[Drip Campaigns](./04-drip-campaigns.md)** - Set up automated sequences

## Troubleshooting

### Server Not Responding

```bash
# Check if server is running
curl http://localhost:3000/health

# If not, start it
npm start
```

### Invalid API Credentials

```bash
# Verify your .env file has:
BAYENGAGE_API_KEY=your_key_here
OPENAI_API_KEY=your_openai_key_here
```

### Rate Limits

If you hit rate limits, the agent will automatically retry with exponential backoff.

## Quick Reference

```bash
# Basic template for all requests
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "your prompt here",
    "agent": "default|campaign_manager|data_analyst",
    "thread_id": "optional_thread_id"
  }'
```

---

**Ready for more?** Continue to [Contact Management Examples](./02-contact-management.md)

# BayEngage AgentKit Examples

This directory contains comprehensive examples for using the BayEngage AgentKit to automate your email marketing workflows with AI-powered conversational agents.

## 📁 Directory Structure

```
examples/
├── README.md                      # This file
├── prompts/                       # Natural language prompt examples
│   ├── 01-getting-started.md     # First steps with the agent
│   ├── 02-contact-management.md  # Managing contacts
│   ├── 03-campaign-creation.md   # Creating campaigns
│   ├── 04-drip-campaigns.md      # Automated email sequences
│   ├── 05-ab-testing.md          # A/B testing campaigns
│   ├── 06-analytics.md           # Campaign analytics & insights
│   └── 07-advanced-workflows.md  # Complex multi-step workflows
├── api/                           # Programmatic API examples
│   ├── README.md                 # API examples overview
│   ├── chat-requests.sh          # cURL examples
│   ├── typescript-examples.ts    # TypeScript SDK usage
│   ├── python-client.py          # Python client examples
│   └── postman-collection.json   # Postman collection
└── workflows/                     # Complete workflow scenarios
    ├── welcome-series.json       # New subscriber onboarding
    ├── abandoned-cart-recovery.json
    ├── drip-onboarding.json
    ├── monthly-newsletter.json
    ├── reengagement.json
    ├── ab-test-subject-lines.json
    ├── vip-nurture.json
    └── seasonal-promotion.json
```

## 🚀 Quick Start

### 1. Using Prompt Examples (Easiest)

The simplest way to get started is to use natural language prompts. Check out the [prompt examples](./prompts/) for ready-to-use phrases:

```bash
# Start the server
npm start

# In another terminal, try a prompt
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"user_input": "List all my campaign segments"}'
```

Browse the [prompts directory](./prompts/) for more examples organized by topic.

### 2. Using API Examples (For Developers)

If you're integrating AgentKit into your application, check the [API examples](./api/):

- **cURL**: Test from command line
- **TypeScript**: Use in Node.js applications
- **Python**: Use in Python applications
- **Postman**: Import collection for API testing

### 3. Using Workflow Scenarios (For Complete Flows)

The [workflows directory](./workflows/) contains complete marketing automation scenarios with step-by-step instructions:

```bash
# Example: Run a welcome series workflow
node examples/api/run-workflow.js workflows/welcome-series.json
```

## 📚 Example Categories

### Basic Operations

- **Contact Management**: Create, update, retrieve, and delete contacts
- **Campaign Creation**: Draft, schedule, and send email campaigns
- **Template Management**: Create and manage email templates

### Marketing Automation

- **Drip Campaigns**: Automated email sequences based on triggers
- **A/B Testing**: Test subject lines, content, and send times
- **Newsletters**: Recurring newsletter automation

### Analytics & Insights

- **Campaign Stats**: Retrieve open rates, click rates, conversions
- **Performance Analysis**: AI-powered insights and recommendations
- **Benchmarking**: Compare against industry standards

### Advanced Workflows

- **Welcome Series**: Multi-email onboarding sequences
- **Abandoned Cart**: Recovery campaigns with dynamic content
- **Re-engagement**: Win back inactive subscribers
- **VIP Nurture**: Special treatment for high-value customers

## 🎯 Choosing the Right Approach

| Use Case | Recommended Approach | Example Location |
|----------|---------------------|------------------|
| Testing the agent | Prompt examples | `prompts/` |
| Learning capabilities | Prompt examples | `prompts/01-getting-started.md` |
| Quick prototyping | cURL examples | `api/chat-requests.sh` |
| Application integration | TypeScript/Python | `api/*.ts` or `api/*.py` |
| Complete automation | Workflow scenarios | `workflows/*.json` |
| API exploration | Postman collection | `api/postman-collection.json` |

## 🔧 Prerequisites

Before running these examples, make sure you have:

1. **AgentKit Server Running**
   ```bash
   npm install
   npm start
   # Server runs at http://localhost:3000
   ```

2. **Environment Variables Configured**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **BayEngage Account Setup**
   - API Key and Secret
   - At least one contact list/segment
   - One or more email templates (for campaign examples)

## 🌟 Popular Examples

### Create Your First Campaign

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a campaign named \"Welcome Email\" with subject \"Welcome to our community!\" using template welcome_1 for segment new_subscribers",
    "agent": "campaign_manager"
  }'
```

### Set Up a Drip Campaign

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Create a welcome drip campaign with 3 emails: Day 0 welcome email, Day 2 product tour, Day 5 special offer",
    "agent": "campaign_manager"
  }'
```

### Analyze Campaign Performance

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_input": "Show me the performance stats for campaign camp_12345 and give me recommendations",
    "agent": "data_analyst"
  }'
```

## 📖 Learning Path

We recommend exploring examples in this order:

1. **Start Here**: `prompts/01-getting-started.md`
2. **Contact Basics**: `prompts/02-contact-management.md`
3. **First Campaign**: `prompts/03-campaign-creation.md`
4. **Automation**: `prompts/04-drip-campaigns.md`
5. **Testing**: `prompts/05-ab-testing.md`
6. **Analytics**: `prompts/06-analytics.md`
7. **Advanced**: `prompts/07-advanced-workflows.md`
8. **Complete Flows**: Explore `workflows/` directory

## 🎓 Tips for Success

### Writing Good Prompts

✅ **Good**: Specific, clear, includes required details
```
"Create a campaign named 'Summer Sale' with subject '50% Off Everything' using template sale_2024 for segment active_customers"
```

❌ **Bad**: Vague, missing details
```
"Create a campaign"
```

### Using Specialized Agents

- **Default Agent**: General operations, when unsure
- **Campaign Manager**: Campaign creation, sending, optimization
- **Data Analyst**: Analytics, insights, recommendations

```bash
# Specify the agent in your request
-d '{"user_input": "...", "agent": "campaign_manager"}'
```

### Conversation Threading

Continue conversations by including the `thread_id`:

```bash
# First request
RESPONSE=$(curl -X POST http://localhost:3000/api/chat -d '{"user_input": "Create a campaign"}')
THREAD_ID=$(echo $RESPONSE | jq -r '.thread_id')

# Follow-up request
curl -X POST http://localhost:3000/api/chat -d "{\"user_input\": \"Change the subject to something better\", \"thread_id\": \"$THREAD_ID\"}"
```

## 🔒 Safety Features

All examples follow safety best practices:

- **Confirmation Required**: Campaign sends require explicit confirmation
- **Draft by Default**: Campaigns are created as drafts
- **Review Before Send**: Always review campaign details before confirming
- **Test Segments**: Examples use test segments where applicable

## 🤝 Contributing Examples

Have a great example workflow? Contribute it!

1. Create a new file in the appropriate directory
2. Follow the existing format
3. Include clear descriptions and expected outcomes
4. Test your example before submitting
5. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/agentkit-bayengage/issues)
- **Documentation**: [Main README](../README.md)
- **API Reference**: [BayEngage API Docs](https://developer.targetbay.com/bayengage/v2/)

## 📄 License

ISC

---

**Ready to get started?** Head to [prompts/01-getting-started.md](./prompts/01-getting-started.md) for your first examples!

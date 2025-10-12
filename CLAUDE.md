# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **OpenAI AgentKit integration for BayEngage**, providing an AI agent that can interact with the BayEngage marketing automation platform. The agent is built using TypeScript and the `@openai/agents` framework.

## Architecture

### Core Components

- **Agent Definition** (`src/agent.ts`): Main agent configuration that defines the BayEngage assistant with available tools
- **Tools** (`src/tools/bayengage.ts`): Tool implementations for BayEngage API operations
- **Schemas** (`src/schemas/`): Currently empty, intended for Zod schemas for data validation

### Tool Pattern

Tools are defined using the `@openai/agents` tool builder pattern with Zod schemas for type-safe parameters:

```typescript
export const createContactTool = tool({
  name: 'tool_name',
  description: 'Description for the agent',
  parameters: z.object({ /* Zod schema */ }),
  async execute(input) { /* Implementation */ }
});
```

### Missing Implementation

The codebase references `bayengageClient` (from `../client`) but this file doesn't exist yet. This client should be an axios instance configured with BayEngage API credentials.

## Development Commands

### Running TypeScript

```bash
npx ts-node src/agent.ts
```

### Type Checking

```bash
npx tsc --noEmit
```

## Technology Stack

- **TypeScript 5.9+** with strict mode and modern ESNext features
- **@openai/agents** - OpenAI's agent framework
- **Zod** - Runtime type validation and schema definition
- **Axios** - HTTP client (for BayEngage API integration)

## Code Structure Guidelines

### Adding New Tools

1. Define tool in `src/tools/bayengage.ts` using the tool builder pattern
2. Export the tool constant
3. Import and add to the tools array in `src/agent.ts`
4. Use Zod schemas for parameter validation

### Tool Naming Convention

- Tool names should be prefixed with `bayengage_` (e.g., `bayengage_create_contact`)
- Tool constants should use camelCase with `Tool` suffix (e.g., `createContactTool`)

### Expected Tools

Based on `src/agent.ts`, the following tools are referenced but not yet implemented:
- `sendCampaignTool` - Send email campaigns
- `getCampaignStatsTool` - Fetch campaign analytics

## Configuration Requirements

The project needs a BayEngage API client configuration. This should be created at `src/client.ts` and export an axios instance:

```typescript
import axios from 'axios';

export const bayengageClient = axios.create({
  baseURL: process.env.BAYENGAGE_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.BAYENGAGE_API_KEY}`,
  },
});
```

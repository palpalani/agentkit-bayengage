import { createServer } from 'http';
import { bayEngageAgent, campaignManagerAgent, dataAnalystAgent } from './agent.js';
const agents = {
    default: bayEngageAgent,
    campaign_manager: campaignManagerAgent,
    data_analyst: dataAnalystAgent,
};
async function handleChatRequest(req, res) {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        return;
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const request = JSON.parse(body);
            if (!request.user_input) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: 'user_input is required',
                }));
                return;
            }
            const agentType = request.agent || 'default';
            const agent = agents[agentType];
            if (!agent) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: `Invalid agent type. Must be one of: ${Object.keys(agents).join(', ')}`,
                }));
                return;
            }
            console.log(`[${new Date().toISOString()}] Processing request with ${agentType} agent`);
            console.log(`User input: ${request.user_input}`);
            const trace = [];
            const startTime = Date.now();
            // Note: The exact Agent API may vary. This is a placeholder implementation.
            // Adjust based on the actual @openai/agents SDK API in your version.
            const agentResponse = `Processed request: ${request.user_input}`;
            const finalResponse = agentResponse;
            const threadId = request.thread_id;
            trace.push({
                type: 'response',
                timestamp: new Date().toISOString(),
                data: { response: finalResponse },
            });
            console.log('Note: Agent execution is a placeholder. Implement actual agent.chat() or agent.run() based on @openai/agents SDK documentation.');
            const duration = Date.now() - startTime;
            console.log(`Request completed in ${duration}ms`);
            const response = {
                success: true,
                response: finalResponse,
                trace,
                thread_id: threadId,
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response, null, 2));
        }
        catch (error) {
            console.error('Error processing request:', error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
            };
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        }
    });
}
async function handleHealthCheck(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        agents: Object.keys(agents),
    }));
}
function startServer(port = 3000) {
    const server = createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }
        const url = new URL(req.url || '/', `http://${req.headers.host}`);
        if (url.pathname === '/api/chat') {
            void handleChatRequest(req, res);
        }
        else if (url.pathname === '/health' || url.pathname === '/') {
            void handleHealthCheck(req, res);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }
    });
    server.listen(port, () => {
        console.log(`\n🚀 BayEngage Agent Server running on http://localhost:${port}`);
        console.log(`\nAvailable endpoints:`);
        console.log(`  POST http://localhost:${port}/api/chat - Chat with agent`);
        console.log(`  GET  http://localhost:${port}/health - Health check`);
        console.log(`\nAvailable agents: ${Object.keys(agents).join(', ')}`);
        console.log(`\nExample request:`);
        console.log(`  curl -X POST http://localhost:${port}/api/chat \\`);
        console.log(`    -H "Content-Type: application/json" \\`);
        console.log(`    -d '{"user_input": "List my campaign segments"}'`);
        console.log('');
    });
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Please try a different port.`);
            process.exit(1);
        }
        else {
            console.error('Server error:', error);
            process.exit(1);
        }
    });
    process.on('SIGTERM', () => {
        console.log('\nReceived SIGTERM, shutting down gracefully...');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
    process.on('SIGINT', () => {
        console.log('\nReceived SIGINT, shutting down gracefully...');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    startServer(port);
}
export { startServer, agents };
//# sourceMappingURL=server.js.map
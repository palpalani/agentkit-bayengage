/**
 * BayEngage AgentKit - TypeScript Examples
 *
 * Usage:
 * npm install axios
 * npx tsx examples/api/typescript-examples.ts
 */
import axios, { AxiosError } from 'axios';
const BASE_URL = 'http://localhost:3000';
class BayEngageAgentClient {
    baseURL;
    threadId;
    constructor(baseURL = BASE_URL) {
        this.baseURL = baseURL;
    }
    async chat(prompt, agent) {
        try {
            const request = {
                user_input: prompt,
                ...(agent && { agent }),
                ...(this.threadId && { thread_id: this.threadId }),
            };
            const response = await axios.post(`${this.baseURL}/api/chat`, request);
            // Store thread_id for conversation continuity
            if (response.data.thread_id) {
                this.threadId = response.data.thread_id;
            }
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error;
                return {
                    success: false,
                    error: axiosError.response?.data?.error || axiosError.message,
                };
            }
            throw error;
        }
    }
    async chatWithRetry(prompt, agent, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await this.chat(prompt, agent);
            }
            catch (error) {
                if (i === maxRetries - 1)
                    throw error;
                await this.sleep(1000 * Math.pow(2, i)); // Exponential backoff
            }
        }
        throw new Error('Max retries exceeded');
    }
    resetThread() {
        this.threadId = undefined;
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
// Example 1: Basic Usage
async function example1_basicUsage() {
    console.log('=== Example 1: Basic Usage ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chat('List all my campaign segments');
    console.log('Response:', response.response);
    console.log('Success:', response.success);
    console.log();
}
// Example 2: Using Specialized Agents
async function example2_specializedAgents() {
    console.log('=== Example 2: Specialized Agents ===\n');
    const client = new BayEngageAgentClient();
    // Campaign Manager Agent
    const campaignResponse = await client.chat('Create a campaign for summer sale', 'campaign_manager');
    console.log('Campaign Manager:', campaignResponse.response);
    // Data Analyst Agent
    const analyticsResponse = await client.chat('What are my best performing campaigns?', 'data_analyst');
    console.log('Data Analyst:', analyticsResponse.response);
    console.log();
}
// Example 3: Conversation Threading
async function example3_conversationThreading() {
    console.log('=== Example 3: Conversation Threading ===\n');
    const client = new BayEngageAgentClient();
    const response1 = await client.chat('Create a campaign named Test Campaign');
    console.log('First response:', response1.response);
    console.log('Thread ID:', response1.thread_id);
    // Follow-up uses the same thread
    const response2 = await client.chat('Change the subject to Welcome Email');
    console.log('Follow-up response:', response2.response);
    console.log('Same thread:', response2.thread_id === response1.thread_id);
    console.log();
}
// Example 4: Contact Management
async function example4_contactManagement() {
    console.log('=== Example 4: Contact Management ===\n');
    const client = new BayEngageAgentClient();
    // Create contact
    const createResponse = await client.chat('Create contact demo@example.com with first name Demo, last name User');
    console.log('Create:', createResponse.response);
    // Get contact
    const getResponse = await client.chat('Get contact demo@example.com');
    console.log('Get:', getResponse.response);
    // Update contact
    const updateResponse = await client.chat('Update contact demo@example.com with phone 555-1234');
    console.log('Update:', updateResponse.response);
    console.log();
}
// Example 5: Campaign Workflow
async function example5_campaignWorkflow() {
    console.log('=== Example 5: Campaign Workflow ===\n');
    const client = new BayEngageAgentClient();
    // Create campaign
    const createResp = await client.chat('Create campaign "Monthly Newsletter" with subject "January Updates" using template newsletter_v1 for segment subscribers', 'campaign_manager');
    console.log('Created:', createResp.response);
    // Review campaign (in same conversation)
    const reviewResp = await client.chat('Show me the campaign details');
    console.log('Details:', reviewResp.response);
    console.log();
}
// Example 6: Error Handling
async function example6_errorHandling() {
    console.log('=== Example 6: Error Handling ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chat('Get contact nonexistent@example.com');
    if (!response.success) {
        console.log('Error occurred:', response.error);
    }
    else {
        console.log('Success:', response.response);
    }
    console.log();
}
// Example 7: Retry Logic
async function example7_retryLogic() {
    console.log('=== Example 7: Retry with Exponential Backoff ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chatWithRetry('List my segments', 'default', 3);
    console.log('Response with retry:', response.response);
    console.log();
}
// Example 8: Drip Campaign Setup
async function example8_dripCampaign() {
    console.log('=== Example 8: Drip Campaign Setup ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chat('Create welcome drip campaign: Day 0 welcome email, Day 2 product tour, Day 5 special offer');
    console.log('Drip campaign:', response.response);
    console.log();
}
// Example 9: A/B Testing
async function example9_abTesting() {
    console.log('=== Example 9: A/B Testing ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chat('Create A/B test for subject lines: "Last Chance" vs "Don\'t Miss Out", test 20% of audience', 'campaign_manager');
    console.log('A/B Test:', response.response);
    console.log();
}
// Example 10: Analytics & Insights
async function example10_analytics() {
    console.log('=== Example 10: Analytics & Insights ===\n');
    const client = new BayEngageAgentClient();
    const response = await client.chat('Analyze the performance of my last 3 campaigns and give recommendations', 'data_analyst');
    console.log('Analysis:', response.response);
    console.log();
}
// Main function
async function main() {
    console.log('BayEngage AgentKit - TypeScript Examples\n');
    console.log('Make sure the server is running: npm start\n');
    try {
        await example1_basicUsage();
        await example2_specializedAgents();
        await example3_conversationThreading();
        await example4_contactManagement();
        await example5_campaignWorkflow();
        await example6_errorHandling();
        await example7_retryLogic();
        await example8_dripCampaign();
        await example9_abTesting();
        await example10_analytics();
        console.log('=== All Examples Complete ===');
    }
    catch (error) {
        console.error('Error running examples:', error);
        process.exit(1);
    }
}
// Run if executed directly
if (require.main === module) {
    main();
}
// Export for use in other modules
export { BayEngageAgentClient };
//# sourceMappingURL=typescript-examples.js.map
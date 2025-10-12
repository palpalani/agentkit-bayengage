declare const agents: {
    default: import("@openai/agents").Agent<unknown, "text">;
    campaign_manager: import("@openai/agents").Agent<unknown, "text">;
    data_analyst: import("@openai/agents").Agent<unknown, "text">;
};
declare function startServer(port?: number): void;
export { startServer, agents };
//# sourceMappingURL=server.d.ts.map
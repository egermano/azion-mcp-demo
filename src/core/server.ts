import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { tools } from "./tools";

export const getServer = () => {
  const server = new McpServer(
    {
      name: "azion-mcp-server",
      version: "1.0.0",
    },
    { capabilities: { logging: {} } }
  );

  tools.forEach((tool) => {
    const { name, execute, ...config } = tool;
    // @ts-ignore
    server.registerTool(name, config, execute);
  });

  return server;
};

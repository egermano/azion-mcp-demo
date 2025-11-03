import { McpTool } from "@/types";
import { z } from "zod";

export function createCalculatorTool(): McpTool {
  return {
    name: "calculator",
    description: `Performs a calculation between two numbers.
        Usage:
            - Inform the first number (A)
            - Inform the second number (B)
            - Inform the operation (add, subtract, multiply, divide)
        `,
    inputSchema: {
      a: z.number(),
      b: z.number(),
      operation: z.enum(["add", "subtract", "multiply", "divide"]),
    },
    outputSchema: { result: z.number() },
    execute: async (args: Record<string, any>) => {
      const { a, b, operation } = args;

      const result: Record<string, (a: number, b: number) => number> = {
        add: (a: number, b: number) => a + b,
        subtract: (a: number, b: number) => a - b,
        multiply: (a: number, b: number) => a * b,
        divide: (a: number, b: number) => a / b,
      };

      const output = result[operation](a, b);

      return {
        content: [
          {
            type: "text",
            text: output.toString(),
          },
        ],
        structuredContent: { result: output },
      };
    },
  };
}

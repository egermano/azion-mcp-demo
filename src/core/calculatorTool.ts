import { McpTool } from "@/types";
import { z } from "zod/v3";

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
      CalculatorInput: z
        .object({
          a: z.number().describe("Number A"),
          b: z.number().describe("Number B"),
          operation: z
            .string()
            .describe(
              "Operation between A and B: add, subtract, multiply, divide"
            ),
        })
        .describe("Calculator input parameters"),
    },
    outputSchema: {
      result: z.number().describe("The calculated result")
    },
    execute: async (args: Record<string, any>) => {
      const { a, b, operation } = args.CalculatorInput;

      const acceptedOperations = ["add", "subtract", "multiply", "divide"];

      if (!acceptedOperations.includes(operation)) {
        throw new Error(`Invalid operation: ${operation}`);
      }

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

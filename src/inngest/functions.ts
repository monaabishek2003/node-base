import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";


const google = createGoogleGenerativeAI();
// const openai = createOpenAI();
// const anthropic = createAnthropic();

export const helloWorld = inngest.createFunction(
  { id: "_prismacreateworkflow" },
  { event: "create-workflow" },

  async ({ event, step }) => {

    await step.sleep("FETCHING", "5s");
    await step.sleep("TRANSCRIBING","5s");
    await step.sleep("SENDING-TO-LLM","5s");

    const createworkflow = await step.run("CREATEWORKFLOW",async ()=>{
      return await prisma.workflow.create({
        data: {
          name: event.data.workflow_name
        }
      })
    })
    return createworkflow;

  },
);


export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
         isEnabled: true,
         recordInputs: true,
         recordOutputs: true,
  }     ,
      }
      
    );

    // const { steps: openaiSteps } = await step.ai.wrap(
    //   "openai-generate-text",
    //   generateText,
    //   {
    //     model: openai("gpt-4"),
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 + 2?",
    //   }
    // );

    // const { steps: anthropicSteps } = await step.ai.wrap(
    //   "anthropic-generate-text",
    //   generateText,
    //   {
    //     model: anthropic("claude-sonnet-4-5"),
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 + 2?",
    //   }
    // );

    return {
      geminiSteps,
      // openaiSteps,
      // anthropicSteps,
    };
  },
);
import { inngest } from "./client";
import prisma from "@/lib/db";

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
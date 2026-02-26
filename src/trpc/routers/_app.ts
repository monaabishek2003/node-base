import { 
  baseProcedure, 
  createTRPCRouter, 
  protectedProcedure 
} from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import z from 'zod';



export const appRouter = createTRPCRouter({
  testai: protectedProcedure
    .input(
      z.object({
        prompt: z.string()
      })
    )
    .mutation(async ({ input }) => {
      console.log("[SERVER] () => appRouter:testai(",input.prompt,")");
      const result = await generateText({
        model: google('gemini-2.5-flash'),
        prompt: input.prompt
      });

      return {
        text: result.text,
      };
    }),

  executeai: protectedProcedure
    .mutation(async () => {
      console.log("[SERVER] () => apprRouter:executeai()")
      await inngest.send({
        name: "execute/ai",
      })
      return { success: true, message: "Job queued" }
    }),

  getUsers: protectedProcedure
    .query(({ctx}) => {
      console.log("[SERVER] () => appRouter:getUsers(",ctx,")");

      return prisma.user.findMany({
        where : {
          id: ctx.auth.user.id,
        }
      });
    }),

  getWorkflows: protectedProcedure
    .query(()=>{
      console.log("[SERVER] () => appRouter:getWorkflows()");

      return prisma.workflow.findMany();
    }),

  createWorkflow: protectedProcedure
    .mutation(async ()=>{
      console.log("[SERVER] () => appRouter.createWorkflow()");
      
      await inngest.send({
        name: "create-workflow",
        data:{
          workflow_name: "inngest-create-workflow"
        }
      })
      
      return {
        message:"CreateWorkflow-Queued"
      }
  })
  
});
// export type definition of API
export type AppRouter = typeof appRouter;
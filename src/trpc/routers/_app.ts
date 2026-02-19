import { 
  baseProcedure, 
  createTRPCRouter, 
  protectedProcedure 
} from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({

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
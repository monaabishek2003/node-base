"use client"

import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(trpc.createWorkflow.
    mutationOptions({
      onSuccess: (data) => {
        console.log("Create Workflow Queued",data);
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success("Create Workflow Queued");
      }
    })
  );

  const executeai = useMutation(trpc.executeai.
    mutationOptions({
      onSuccess: (data) => {
        console.log("AI Job Queued",data);
        toast.success("AI Job Queued")
      }
    })
  );

  
  return (
    <div 
      className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6"
    >
      Protected server component
      <div>
        {JSON.stringify(data,null,1 )}
      </div>
      <Button disabled={executeai.isPending} onClick={()=>executeai.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  )
}

export default page


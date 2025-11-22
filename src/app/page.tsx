import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { Users } from "@/app/users";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button>click me</Button>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <Users/>
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}

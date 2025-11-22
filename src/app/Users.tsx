"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const Users = () => {
  const trpc = useTRPC();
  const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      Users data : {JSON.stringify(users)}
    </div>
  )
}
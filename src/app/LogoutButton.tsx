"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton =  () => {
  const router = useRouter();
  const signOut = async () =>  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("Successfully Logged Out");
        router.push("/login");
      },
    }
  })
  return (
    <Button 
      onClick={() => signOut()}
    >
      Logout X
    </Button>
  )
}

export default LogoutButton;


import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server";
import LogoutButton from "./LogoutButton";

const page = async () => {

  await requireAuth();

  const data = await caller.getUsers();
  
  return (
    <div 
      className="min-h-screen min-w-screen flex items-center justify-center"
    >
      Protected server component
      <div>
        {JSON.stringify(data,null,1 )}
      </div>
      <LogoutButton/>
    </div>
  )
}

export default page


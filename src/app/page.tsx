import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function Home() {
  const users  = await prisma.user.findMany();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button>click me</Button>
      <div>
        {JSON.stringify(users)}
      </div>
    </div>
  );
}

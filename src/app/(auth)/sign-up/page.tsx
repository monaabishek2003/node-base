import { SignupForm } from "@/app/features/auth/signup-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();
  return (
    <div>
      <SignupForm/>
    </div>
  )
}

export default Page;

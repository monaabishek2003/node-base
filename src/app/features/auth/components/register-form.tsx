"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { check, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";

const signupSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1,"Password is required"),  
  confirmPassword: z.string(),  
})
.refine( data => data.password === data.confirmPassword,{
  message: "passwords don't match",
  path: ["confirmPassword"]
})

type SignupFormValues = z.infer<typeof signupSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (values: SignupFormValues) => {
    console.log("SignUp Values:",values);
    const {data, error } = await authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Sign-up Successful")
          router.push("/")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        }
      }
    )
    console.log(data,error);
  }

  const isPending = form.formState.isSubmitting;

  return(
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>
            Get Started
          </CardTitle>
          <CardDescription>
            Create an account to Get Started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      alt="google" 
                      src="/logos/google.svg" 
                      width={20} 
                      height={20}
                    />
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      alt="githb" 
                      src="/logos/github.svg" 
                      width={20} 
                      height={20}
                    />
                    Continue with GitHub
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 mt-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                >
                  Signup
                </Button>
                <div className="text-center text-sm">
                  Already Have an Account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

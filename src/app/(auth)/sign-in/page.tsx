import Branding from "@/components/Branding";
import { Card, Divider } from "@nextui-org/react";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default function page() {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <Card className="px-8 py-8 w-full max-w-[460px]">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="scale-150">
            <Branding />
          </div>

          <h1>Sign in to your account</h1>
        </div>
        <SignInForm />
        <Divider className="my-4" />
        <span className="text-center">
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} replace={true} className="text-blue-400">
            Sign up
          </Link>
        </span>
      </Card>
    </div>
  );
}

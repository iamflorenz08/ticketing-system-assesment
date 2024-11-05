import Branding from "@/components/Branding";
import { Card, Divider } from "@nextui-org/react";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function page() {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <Card className="px-8 py-8 w-full max-w-[460px]">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="scale-150">
            <Branding />
          </div>
          <h1>Welcome!</h1>
        </div>
        <SignUpForm />
        <Divider className="my-4" />
        <span className="text-center">
          Already have an account?{" "}
          <Link href={"/sign-in"} replace={true} className="text-blue-400">
            Sign in
          </Link>
        </span>
      </Card>
    </div>
  );
}

"use client";
import { SignInSchema } from "@/libs/validationSchema";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const [pending, setPending] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    if (errorMessage) toast.error(errorMessage);
  }, [searchParams]);

  const handleSignIn = async () => {
    if (pending) return;

    const validatedFields = SignInSchema.safeParse({
      email: inputs.email,
      password: inputs.password,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors;
      setErrors({
        email: errors["email"]?.[0] ?? "",
        password: errors["password"]?.[0] ?? "",
      });
      return;
    }

    setErrors({
      email: "",
      password: "",
    });

    setPending(true);
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      callbackUrl: "/",
    });
    setPending(false);
  };
  return (
    <>
      <div className="space-y-4 mt-8">
        <Input
          type="email"
          variant="flat"
          label="Email"
          className="w-full"
          name="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email}
        />
        <Input
          type="password"
          variant="flat"
          label="Password"
          className="w-full"
          name="password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Link href={"/"} className="text-blue-400">
          Forgot Password?
        </Link>
      </div>
      <div className="mt-4">
        <Button
          onPress={handleSignIn}
          disabled={pending}
          isLoading={pending}
          type="submit"
          color="primary"
          className="w-full"
          size="lg"
        >
          Sign in
        </Button>
      </div>
    </>
  );
}

"use client";
import AvatarSelector from "./AvatarSelector";
import { Button, Input } from "@nextui-org/react";
import { createUser } from "@/libs/action";
import { useActionState, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: false,
};

export default function SignUpForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [inputs, setInputs] = useState<any>({
    image: "",
  });
  const [state, formAction, pending] = useActionState(createUser, initialState);
  const signInRedirect = () => {
    signIn("credentials", {
      email: inputs.email,
      password: inputs.password,
      callbackUrl: "/",
    });
  };
  useEffect(() => {
    if (state.success) signInRedirect();
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <>
      <form action={formAction}>
        <div className="flex flex-col gap-4 mt-8">
          <AvatarSelector
            onSelect={(src) => setInputs({ ...inputs, image: src })}
          />
          <input type="hidden" name="image" value={inputs.image} />
          <Input
            type="email"
            variant="flat"
            label="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="w-full mt-4"
            isInvalid={Boolean(state.email)}
            errorMessage={state.email}
          />
          <Input
            type="password"
            variant="flat"
            label="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className="w-full"
            isInvalid={Boolean(state.password)}
            errorMessage={state.password}
          />
          <Input
            type="password"
            variant="flat"
            label="Confirm Password"
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
            className="w-full"
            isInvalid={Boolean(state.confirmPassword)}
            errorMessage={state.confirmPassword}
          />
        </div>
        <div className="mt-8">
          <Button
            disabled={pending}
            isLoading={pending}
            type="submit"
            color="primary"
            className="w-full"
            size="lg"
          >
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
}

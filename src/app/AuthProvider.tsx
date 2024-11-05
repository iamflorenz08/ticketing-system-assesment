"use client";
import { IBaseProp } from "@/models/BaseProp";
import { SessionProvider } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IBaseProp {}

export default function AuthProvider({ children }: IProps) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}

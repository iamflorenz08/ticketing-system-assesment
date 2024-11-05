import { AuthOption } from "@/libs/authOption";
import { IBaseProp } from "@/models/BaseProp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IBaseProp {}

export default async function layout({ children }: IProps) {
  const session = await getServerSession(AuthOption);
  if (session?.user) redirect("/");
  return <>{children}</>;
}

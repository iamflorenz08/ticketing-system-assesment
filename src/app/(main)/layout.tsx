import NavBar from "@/components/NavBar";
import { IBaseProp } from "@/models/BaseProp";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProp extends IBaseProp {}

export default function layout({ children }: IProp) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

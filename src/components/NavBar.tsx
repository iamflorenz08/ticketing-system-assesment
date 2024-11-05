import React from "react";
import CreateTicket from "./CreateTicket";
import { IoTicket } from "@react-icons/all-files/io5/IoTicket";
import UserMenu from "./UserMenu";
export default function NavBar() {
  return (
    <nav className="p-4 shadow-md">
      <div className="flex justify-between items-center">
        <span className="font-medium text-xl text-primary flex items-center gap-2">
          <IoTicket size={25} />
          Ticketing System
        </span>
        <div className="flex items-center gap-8">
          <CreateTicket />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

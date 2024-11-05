"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "@react-icons/all-files/io/IoMdArrowDropdown";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import Image from "next/image";
export default function UserMenu() {
  const session = useSession();
  const userImage = session.data?.user?.image;
  if (["loading", "unauthenticated"].includes(session.status)) return null;
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button className="flex items-center gap-2">
            <div className="relative flex items-center justify-center rounded-full h-10 w-10 bg-gray-100">
              {userImage ? (
                <Image src={userImage} alt="avatar" fill />
              ) : (
                <FaUser color="gray" />
              )}
            </div>
            <span className="text-gray-500 hidden md:block">
              {session.data?.user?.email}
            </span>
            <IoMdArrowDropdown />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onPress={() => signOut()}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

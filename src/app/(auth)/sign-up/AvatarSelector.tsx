"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { MdOutlineEdit } from "@react-icons/all-files/md/MdOutlineEdit";
import Man1 from "@/images/man-1.png";
import Man2 from "@/images/man-2.png";
import Woman1 from "@/images/woman-1.png";
import Woman2 from "@/images/woman-2.png";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  onSelect?: (src: string) => void;
}

export default function AvatarSelector({ onSelect }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const avatars = [
    {
      key: "man1",
      image: Man1,
      src: "/images/man-1.png",
    },
    {
      key: "man2",
      image: Man2,
      src: "/images/man-2.png",
    },
    {
      key: "woman1",
      image: Woman1,
      src: "/images/woman-1.png",
    },
    {
      key: "woman2",
      image: Woman2,
      src: "/images/woman-2.png",
    },
  ];

  const handleSelect = (src: string) => {
    setSelectedAvatar(src);
    if (onSelect) onSelect(src);
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center gap-2 justify-center">
        <Popover
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          placement="bottom"
        >
          <PopoverTrigger>
            <div className="relative rounded-full w-40 h-40 bg-gray-200 flex justify-center items-center group cursor-pointer">
              {selectedAvatar && (
                <Image src={selectedAvatar} alt="avatar" fill />
              )}

              <MdOutlineEdit
                color="white"
                size={32}
                className="group-hover:scale-125 duration-300"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 grid grid-flow-col gap-4 grid-rows-2">
              {avatars.map((avatar) => (
                <div
                  onClick={() => handleSelect(avatar.src)}
                  key={avatar.key}
                  className="relative h-32 w-32 cursor-pointer hover:scale-105 duration-200"
                >
                  <Image alt={avatar.key} src={avatar.image} fill />
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

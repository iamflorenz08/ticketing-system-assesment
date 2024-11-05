"use client";

import { deleteTicket } from "@/libs/action";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineTrash } from "@react-icons/all-files/hi/HiOutlineTrash";
import { RxCrossCircled } from "@react-icons/all-files/rx/RxCrossCircled";

interface IProps {
  ticketId: string;
  onDelete?: () => void;
}

export default function DeleteTicket({ ticketId, onDelete }: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pending, setPending] = useState<boolean>(false);
  const handleAction = async () => {
    onClose();
    if (pending) return;
    setPending(true);
    deleteTicket(ticketId)
      .then((data) => {
        if (!data.success) throw new Error();
        toast.success("Ticket deleted.");

        if (onDelete) onDelete();
      })
      .catch(() => {
        toast.error("Ticket deletion failed.");
      })
      .finally(() => setPending(false));
  };

  return (
    <>
      <Button onPress={onOpen} disabled={pending} color="danger">
        {pending ? (
          <Spinner size="sm" color="white" />
        ) : (
          <>
            <HiOutlineTrash /> Delete
          </>
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-6 items-center justify-center">
                  <span className="text-red-500">
                    <RxCrossCircled size={100} />
                  </span>
                  <span className="text-center text-gray-500">
                    Do you really want to delete this ticket? This process
                    cannot be undone
                  </span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={handleAction}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

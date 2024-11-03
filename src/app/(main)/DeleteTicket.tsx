"use client";

import { deleteTicket } from "@/libs/action";
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  ticketId: string;
  onDelete?: () => void;
}

export default function DeleteTicket({ ticketId, onDelete }: IProps) {
  const [pending, setPending] = useState<boolean>(false);
  const handleAction = async () => {
    if (pending) return;
    setPending(true);
    deleteTicket(ticketId)
      .then((data) => {
        if (!data.success) throw new Error();
        toast.success("Ticket has been successfully deleted.");

        if (onDelete) onDelete();
      })
      .catch(() => {
        toast.error("Ticket deletion failed.");
      })
      .finally(() => setPending(false));
  };

  return (
    <Button onPress={handleAction} disabled={pending} color="danger">
      {pending ? <Spinner size="sm" color="white" /> : "Delete"}
    </Button>
  );
}

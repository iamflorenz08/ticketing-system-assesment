"use client";
import {
  DummyUsers,
  TicketCategories,
  TicketDepartments,
  TicketPriorities,
  TicketStatuses,
} from "@/constants/Lists";
import { createTicket, updateTicket } from "@/libs/action";
import {
  ITicket,
  TCategories,
  TDepartments,
  TPriorities,
  TStatus,
} from "@/models/TicketModel";
import { useTableKeyStore } from "@/stores/TableKey";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { HiPencilSquare } from "@react-icons/all-files/hi2/HiPencilSquare";
import { LuSave } from "@react-icons/all-files/lu/LuSave";

interface IProps {
  ticket?: ITicket;
  editMode?: boolean;
}

export default function CreateTicket({ ticket, editMode = false }: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pending, setPending] = useState<boolean>(false);
  const [payload, setPayload] = useState<ITicket>(ticket!);
  const { mutate } = useSWRConfig();
  const key = useTableKeyStore((state) => state.key);

  useEffect(() => {
    if (!isOpen && !editMode) setPayload({} as ITicket);
  }, [isOpen, editMode]);

  const submitTicket = async () => {
    if (pending) return true;
    setPending(true);
    try {
      const data = editMode
        ? await updateTicket(payload)
        : await createTicket(payload);
      if (!data.success) throw new Error();
      toast.success(
        editMode ? "Ticket saved successfully!" : "Ticket created successfully!"
      );
      mutate(key);
      onClose();
    } catch {
      toast.error(
        editMode ? "Ticket saving failed." : "Ticket creation failed."
      );
    }
    setPending(false);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        {editMode ? (
          <>
            <HiPencilSquare /> Edit
          </>
        ) : (
          "Create a ticket"
        )}
      </Button>

      <Modal
        hideCloseButton={true}
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editMode ? "Ticket #" + ticket?.ticket_id : "New Ticket"}
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="w-full"
                  value={payload?.description ?? ""}
                  onValueChange={(value) =>
                    setPayload({ ...payload, description: value })
                  }
                />

                <div className="flex gap-4 mt-4">
                  <Select
                    isRequired
                    labelPlacement="outside"
                    label="Category"
                    placeholder="Select a category"
                    className="max-w-xs"
                    items={TicketCategories}
                    selectedKeys={[payload?.category as TCategories]}
                    onSelectionChange={(keys) =>
                      setPayload({
                        ...payload,
                        category: keys.currentKey as TCategories,
                      })
                    }
                  >
                    {(category) => (
                      <SelectItem key={category.key}>
                        {category.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    isRequired
                    labelPlacement="outside"
                    label="Priority"
                    placeholder="Select a priority"
                    className="max-w-xs"
                    items={TicketPriorities}
                    selectedKeys={[payload?.priority as TPriorities]}
                    onSelectionChange={(keys) =>
                      setPayload({
                        ...payload,
                        priority: keys.currentKey as TPriorities,
                      })
                    }
                  >
                    {(priority) => (
                      <SelectItem
                        key={priority.key!}
                        startContent={<FaCircle color={priority.color} />}
                      >
                        {priority.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>

                <div className="flex gap-4 mt-4">
                  <Select
                    isRequired
                    labelPlacement="outside"
                    label="Status"
                    placeholder="Select a status"
                    className="max-w-xs"
                    items={TicketStatuses}
                    selectedKeys={[payload?.status as TStatus]}
                    onSelectionChange={(keys) =>
                      setPayload({
                        ...payload,
                        status: keys.currentKey as TStatus,
                      })
                    }
                  >
                    {(status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    )}
                  </Select>
                  <Select
                    isRequired
                    labelPlacement="outside"
                    label="Deparment"
                    placeholder="Select a department"
                    className="max-w-xs"
                    items={TicketDepartments}
                    selectedKeys={[payload?.department as TDepartments]}
                    onSelectionChange={(keys) =>
                      setPayload({
                        ...payload,
                        department: keys.currentKey as TDepartments,
                      })
                    }
                  >
                    {(deparment) => (
                      <SelectItem key={deparment.key}>
                        {deparment.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="mt-4">
                  <Select
                    isRequired
                    labelPlacement="outside"
                    label="User"
                    placeholder="Assign a user"
                    className="w-full"
                    items={DummyUsers}
                    selectedKeys={[payload?.user as string]}
                    onSelectionChange={(keys) =>
                      setPayload({
                        ...payload,
                        user: keys.currentKey as string,
                      })
                    }
                  >
                    {(user) => (
                      <SelectItem key={user.key}>{user.label}</SelectItem>
                    )}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  disabled={pending}
                  onPress={submitTicket}
                  className="bg-green-600 text-white"
                  isLoading={pending}
                >
                  <LuSave />
                  {editMode ? "Save" : "Create ticket"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

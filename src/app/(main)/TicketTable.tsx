"use client";
import CreateTicket from "@/components/CreateTicket";
import { API, APIBASEV1 } from "@/constants/Api";
import { fetcher } from "@/libs/fetch";
import { IResponse } from "@/models/Response";
import { ITicket, TStatus } from "@/models/TicketModel";
import {
  formatParams,
  getCategory,
  getDepartment,
  getPriority,
  getStatus,
} from "@/utils/formatter";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DeleteTicket from "./DeleteTicket";
import { useTableKeyStore } from "@/stores/TableKey";

interface IProps {
  status?: TStatus;
}

export default function TicketTable({ status }: IProps) {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const setKey = useTableKeyStore((state) => state.setKey);
  const key = `${APIBASEV1(API.ticket.index)}?${formatParams(status, page)}`;
  const { data, isLoading, mutate } = useSWR<IResponse<ITicket[]>>(
    () => key,
    fetcher
  );

  useEffect(() => {
    if (data?.success) {
      setTotalPage(data.total_page!);
      return;
    }
  }, [data]);

  useEffect(() => {
    setKey(key);
  }, [key, setKey]);

  const columns = [
    {
      key: "ticket_id",
      label: "Ticket ID",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "deparment",
      label: "Department",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const loadingState = isLoading ? "loading" : "idle";
  return (
    <>
      <Table
        aria-label="Example static collection table"
        color="primary"
        bottomContent={
          data &&
          data.total_page! > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                initialPage={1}
                page={page}
                total={totalPage}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No data"}
          loadingState={loadingState}
          loadingContent={<Spinner color="primary" />}
          items={data?.data ?? []}
        >
          {(ticket) => (
            <TableRow key={ticket.ticket_id}>
              <TableCell>{ticket.ticket_id}</TableCell>
              <TableCell>
                <span className="line-clamp-1 max-w-40">
                  {ticket.description}
                </span>
              </TableCell>
              <TableCell>{getCategory(ticket.category)?.label}</TableCell>
              <TableCell>
                <Chip
                  variant="flat"
                  style={getPriority(ticket.priority)?.style}
                >
                  {getPriority(ticket.priority)?.label}
                </Chip>
              </TableCell>
              <TableCell>{getStatus(ticket.status)?.label}</TableCell>
              <TableCell>{getDepartment(ticket.department)?.label}</TableCell>
              <TableCell className="flex gap-2">
                <CreateTicket ticket={ticket} editMode={true} />
                <DeleteTicket
                  ticketId={ticket._id!}
                  onDelete={() => mutate()}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

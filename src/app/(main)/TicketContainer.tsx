"use client";

import { Tab, Tabs } from "@nextui-org/react";
import TicketTable from "./TicketTable";
import { TicketStatuses } from "@/constants/Lists";
import { TStatus } from "@/models/TicketModel";

export default function TicketContainer() {
  const statuses = TicketStatuses.map((status) => ({
    id: status.key,
    label: status.label,
    content: <TicketTable key={status.key} status={status.key as TStatus} />,
  }));
  const tabs = [
    {
      id: "all",
      label: "All",
      content: <TicketTable key={"all"} />,
    },
    ...statuses,
  ];

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Dynamic tabs" items={tabs} color="primary">
          {(item) => (
            <Tab key={item.id} title={item.label}>
              {item.content}
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
}

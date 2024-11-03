import { CSSProperties } from "react"

interface IDynamicContent {
    key?: string,
    label?: string,
    color?: string,
    style?: CSSProperties
}

export const TicketCategories = [
    {
        key: "hr_request",
        label: "HR Request"
    },
    {
        key: "incident",
        label: "Incident"
    },
    {
        key: "trouble",
        label: "Trouble"
    },
    {
        key: "change_order",
        label: "Change Order"
    },
    {
        key: "change_request",
        label: "Change Request"
    },
    {
        key: "job_order",
        label: "Job Order"
    },
]

export const TicketPriorities: IDynamicContent[] = [
    {
        key: "low",
        label: "Low",
        color: "blue",
        style: {
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            color: 'rgba(0, 0, 255, 0.8)'
        }
    },
    {
        key: "medium",
        label: "Medium",
        color: "yellow",
        style: {
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            color: 'rgba(255, 150, 0, 0.8)'
        }
    },
    {
        key: "high",
        label: "High",
        color: "orange",
        style: {
            backgroundColor: 'rgba(255, 128, 0, 0.2)',
            color: 'rgba(255, 128, 0, 0.8)'
        }
    },
    {
        key: "critical",
        label: "Critical",
        color: "red",
        style: {
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            color: 'rgba(255, 0, 0, 0.8)'
        }
    },
]


export const TicketStatuses = [
    {
        key: "open",
        label: "Open"
    },
    {
        key: "in_progress",
        label: "In Progress"
    },
    {
        key: "on_hold",
        label: "On-hold"
    },
    {
        key: "cancelled",
        label: "Cancelled"
    },
    {
        key: "closed",
        label: "Closed"
    },
]

export const TicketDepartments = [
    {
        key: "it",
        label: "IT"
    },
    {
        key: "hr",
        label: "HR"
    },
    {
        key: "finance",
        label: "Finance"
    },
    {
        key: "creative",
        label: "Creatives"
    },
    {
        key: "marketing",
        label: "Marketing"
    },
]

export const DummyUsers = [
    {
        key: "user1",
        label: "Randy Santiago"
    },
    {
        key: "user2",
        label: "Tina Ramirez"
    },
    {
        key: "user3",
        label: "Kevin Johnson"
    },
    {
        key: "user4",
        label: "Lisa Chen"
    },
    {
        key: "user5",
        label: "Michael Patel"
    }
];
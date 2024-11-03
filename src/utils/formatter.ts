import { TicketCategories, TicketDepartments, TicketPriorities, TicketStatuses } from "@/constants/Lists";

export const formatParams = (status?: string, page?: number) => {
    const params = new URLSearchParams();
    if (status) {
        params.set("status", status);
    }

    if (page) {
        params.set("page", String(page))
    }

    return params.toString();
};

export const getPriority = (priorityKey?: string) => {
    return TicketPriorities.find(
        (priority) => priority.key === priorityKey
    )
}

export const getCategory = (key?: string) => {
    return TicketCategories.find(
        (category) => category.key === key
    )
}

export const getStatus = (key?: string) => {
    return TicketStatuses.find(
        (status) => status.key === key
    )
}

export const getDepartment = (key?: string) => {
    return TicketDepartments.find(
        (department) => department.key === key
    )
}
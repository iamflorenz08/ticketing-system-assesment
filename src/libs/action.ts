"use server"
import { API, APIBASEV1 } from "@/constants/Api"
import { fetchData } from "./fetch"
import { ITicket } from "@/models/TicketModel"

export const createTicket = async (payload: ITicket) => {
    return await fetchData(APIBASEV1(API.ticket.index), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export const updateTicket = async (payload: ITicket) => {
    return await fetchData(APIBASEV1(API.ticket.ticket_id).replace(':ticket_id', payload._id!), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export const deleteTicket = async (ticket_id: string) => {
    return await fetchData(APIBASEV1(API.ticket.ticket_id).replace(':ticket_id', ticket_id), {
        method: 'DELETE'
    })
}
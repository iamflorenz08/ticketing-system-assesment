"use server"
import { API, APIBASEV1 } from "@/constants/Api"
import { fetchData } from "./fetch"
import { ITicket } from "@/models/TicketModel"
import { SignUpSchema } from "./validationSchema"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (prevState: any, formData: FormData) => {
    const validatedFields = SignUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        return { email: errors['email'], password: errors['password'], confirmPassword: errors['confirmPassword'] }
    }

    const payload = { ...validatedFields.data, image: formData.get('image') }
    const { success, message } = await fetchData(APIBASEV1(API.auth.signUp), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!success && message === 'Email already existed.') return { email: 'Email already existed.' }
    else if (!success) return { error: "Failed to create your account." }

    return { email: "", password: "", confirmPassword: "", error: "", success: true }
}
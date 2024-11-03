const API_BASE = process.env.API_BASE ?? process.env.NEXT_PUBLIC_API_BASE

export const API = {
    ticket: {
        index: '/api/v1/tickets',
        ticket_id: '/api/v1/tickets/:ticket_id'
    }
}

export const APIBASEV1 = (apiKey: string) => `${API_BASE}${apiKey}`
export type TCategories = 'hr_request' | 'incident' | 'trouble' | 'change_order' | 'change_request' | 'job_order'
export type TPriorities = 'low' | 'medium' | 'high' | 'critical'
export type TStatus = 'open' | 'in_progress' | 'on_hold' | 'cancelled' | 'closed'
export type TDepartments = 'it' | 'hr' | 'finance' | 'creative' | 'marketing'

export interface ITicket {
    _id?: string,
    ticket_id?: string,
    description?: string,
    category?: TCategories
    priority?: TPriorities
    status?: TStatus
    department: TDepartments
    user?: string
}
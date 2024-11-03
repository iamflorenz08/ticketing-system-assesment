export interface IResponse<T = unknown> {
    success: boolean,
    message?: string,
    data?: T,
    current_page?: number,
    total_page?: number
}
export const fetchData = async <T = unknown>(
    input: string | URL | globalThis.Request,
    init?: RequestInit,
): Promise<{ success?: boolean, message?: string, data?: T }> => {
    try {
        const res = await fetch(input, init)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        return {
            success: data.success,
            data: data.data,
            message: data.message
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return await {
            success: false,
            message: error.message
        }
    }
}

export const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then(async (res) => res.json())
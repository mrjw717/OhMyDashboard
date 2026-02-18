const BASE_URL = ''

interface RequestOptions extends RequestInit {
    params?: Record<string, string>
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl
    }

    private buildUrl(path: string, params?: Record<string, string>): string {
        const url = new URL(path, window.location.origin)
        if (this.baseUrl) {
            url.pathname = `${this.baseUrl}${url.pathname}`
        }
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value)
            })
        }
        return url.toString()
    }

    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
        const { params, ...init } = options
        const response = await fetch(this.buildUrl(path, params), {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...init.headers,
            },
        })

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText)
        }

        return response.json()
    }

    get<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.request<T>(path, { ...options, method: 'GET' })
    }

    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>(path, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>(path, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        })
    }

    delete<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.request<T>(path, { ...options, method: 'DELETE' })
    }
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message)
        this.name = 'ApiError'
    }

    static fromResponse(response: Response): ApiError {
        return new ApiError(response.status, response.statusText)
    }
}

export const apiClient = new ApiClient(BASE_URL)

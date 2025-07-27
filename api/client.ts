import { BASE } from "@/constants/Urls";

async function request<T>(
    input: string,
    init?: RequestInit
): Promise<T> {
    try {
        const res = await fetch(`${BASE}${input}`, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            ...init,
        });
        console.log(res);

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || res.statusText);
        }
        return res.json();
    } catch (error) {
        console.error('Error in API request:', error);
        throw error;
    }
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    post: <TBody = unknown, TResponse = unknown>(url: string, body: TBody) =>
        request<TResponse>(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }),
};

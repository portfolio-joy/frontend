export default async function ApiRequest(url: string, data: RequestInit) {
    const BASE_URL = process.env.NEXT_PUBLIC_BE_HOSTNAME
    const response = await fetch(`${BASE_URL}${url}`, data);
    if (!response.ok) {
        throw new Error(await response.text());
    }
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) === 0) {
        return null;
    }
    return response.json();
}
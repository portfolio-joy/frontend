const BASE_URL = 'http://localhost:8080/user'

export default async function ApiRequest(url : string, data: RequestInit) {
    const response = await fetch(`${BASE_URL}${url}`,data);
    if(!response.ok)
    {
        throw new Error((await response.json()));
    }
    return response.json();
}
import { parseJSON } from "@/utils/parse"

const baseURL = import.meta.env.VITE_BASE_URL ?? ""

const headers = new Headers()
headers.set("Content-Type", "application/json")

const handleFetch = async <T>(fn: () => Promise<Response>): Promise<T> => {
  try {
    const response = await fn()
    const data = await response.json()
    return parseJSON(data) as T
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return null as T
  }
}

const api = {
  async get<T>(url: string): Promise<T> {
    const result = await handleFetch<T>(() => fetch(`${baseURL}/api${url}`, { headers }))
    return result
  },
  async post<T, D>(url: string, data: D): Promise<T> {
    const result = await handleFetch<T>(() =>
      fetch(`${baseURL}/api${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      }),
    )
    return result
  },
}

export default api


const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
}

export async function api<T>(
  endpoint: string,
  { method = "GET", body, headers = {} }: ApiOptions = {}
): Promise<T | null> {
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const url = `${baseUrl}/api/${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error("Network response was not ok");
      }
      throw new Error(errorData.error || "Error in API call");
    }

    if (response.status === 204) {
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
  if (error instanceof Error) {
    console.error(`API error on ${method} ${url}:`, error.message);
    throw error;
  } else {
    console.error(`API error on ${method} ${url}:`, error);
    throw new Error("Unknown error");
  }
}
}

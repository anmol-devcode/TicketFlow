const BASE_URL = "http://localhost:3000";

//response
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("ticketflow_token");

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Baearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({
      message: " Something went wrong",
    }));

    throw new Error(body.message || "Request Failed");
  }

  return response.json();
}

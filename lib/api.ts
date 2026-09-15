export type ApiResponse<T> = T & { error?: string };

export async function readApiResponse<T>(
  response: Response,
): Promise<ApiResponse<T>> {
  const text = await response.text();
  if (!text) return {} as ApiResponse<T>;
  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    return { error: `Request failed (${response.status}).` } as ApiResponse<T>;
  }
}
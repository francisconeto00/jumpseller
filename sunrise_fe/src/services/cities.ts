import { api } from "../lib/api";
import type { CitiesResponse } from "../types/city";

interface GetCitiesParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getCities({
  search = "",
  page = 1,
  pageSize = 24,
}: GetCitiesParams = {}) {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  params.append("page", page.toString());
  params.append("per_page", pageSize.toString());

  const response: CitiesResponse | null = await api(`cities?${params.toString()}`);
  return response;
}

import { toast } from "react-toastify";
import { api } from "../lib/api";
import type { CitiesResponse } from "../types/city";
import { ApiError } from "../types/api";

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
try {
    const response: CitiesResponse | null = await api(`cities?${params.toString()}`);
    return response;
  } catch (err) {
      console.log('err');
      if (err instanceof ApiError) {
        if (err.status === 500) {
          toast.error("Oops! Something went wrong on the server.");
        } else {
          toast.error(err.message);
          console.log(err.status);
          if(err.status==404){
            console.log('404');
          }
        }
    } else {
      toast.error("Unknown error occurred");
    }
  }
}

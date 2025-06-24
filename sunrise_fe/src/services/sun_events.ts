import { toast } from "react-toastify";
import { api } from "../lib/api";
import type { GetSunEventsParams, SunEventsResponse } from "../types/sun";
import { ApiError } from "../types/api";

export async function getSunEvents({ id, dateStart, dateEnd }: GetSunEventsParams) {
  const params = new URLSearchParams();

  if (dateStart) params.append("date_start", dateStart);
  if (dateEnd) params.append("date_end", dateEnd);

  const url = `sun_events/${id}?${params.toString()}`;
  try {
        const response: SunEventsResponse | null = await api(url);
      return response;
    }   catch (err) {
        console.log('err');
        if (err instanceof ApiError) {
          if (err.status === 500) {
            toast.error("Oops! Something went wrong on the server.");
          } else {
            if(err.status==404){
                setTimeout(() => {
                    window.location.href = "/search" + window.location.search;
                }, 1500);
            }
            toast.error(err.message);
          }
      } else {
        toast.error("Unknown error occurred");
      }
    }

}
import type { Pagination } from "./pagination";

export interface City {
  id: number;
  name: string;
  country: string;
  lat: string;
  long: string;
  created_at: string;
  updated_at: string;
}

export interface CitiesResponse {
  cities: City[];
  meta: Pagination;
}
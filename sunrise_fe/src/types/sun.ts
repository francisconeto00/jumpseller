export interface GetSunEventsParams {
  id: string | number;
  dateStart?: string | null;
  dateEnd?: string | null;
}

export interface SunEvent {
  date: string;
  sunrise: string | null;
  sunset: string | null;
   dawn: string | null;
  dusk: string | null;
  golden_hour: string | null
}

export interface SunEventsResponse {
  city: string;
  data: SunEvent[];
}


export interface SunChartProps {
  data: SunEvent[];
}

export interface SunTableProps {
  data: SunEvent[];
}
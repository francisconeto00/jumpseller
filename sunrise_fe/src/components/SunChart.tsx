import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { SunChartProps } from "../types/sun";

function timeToMinutes(time: string | null): number | null {
  if (!time) return null;
  const [h, m, s] = time.split(":").map(Number);
  return h * 60 + m + Math.floor(s / 60);
}

export default function SunChart({ data }: SunChartProps) {
  const chartData = data.map((entry) => ({
    date: entry.date,
    sunrise: timeToMinutes(entry.sunrise),
    sunset: timeToMinutes(entry.sunset),
    dawn: timeToMinutes(entry.dawn),
    dusk: timeToMinutes(entry.dusk),
    golden_hour: timeToMinutes(entry.golden_hour),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[0, 1440]}
          tickFormatter={(value) =>
            `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
              value % 60
            ).padStart(2, "0")}`
          }
          label={{ angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          formatter={(value: any) =>
            `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
              value % 60
            ).padStart(2, "0")}`
          }
        />
        <Line
          type="monotone"
          dataKey="sunrise"
          stroke="#FFD700"
          name="Sunrise"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="sunset"
          stroke="#FF4500"
          name="Sunset"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="dawn"
          stroke="#1E90FF"
          name="Dawn"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="dusk"
          stroke="#4B0082"
          name="Dusk"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="golden_hour"
          stroke="#FFA500"
          name="Golden Hour"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

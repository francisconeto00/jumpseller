import type { SunTableProps } from "../types/sun";

export default function SunTable({ data }: SunTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 ">Date</th>
          <th className="border border-gray-300 px-4 py-2 text-[#FFD700] FFD700">
            Sunrise
          </th>
          <th className="border border-gray-300 px-4 py-2 text-[#FF4500]">
            Sunset
          </th>
          <th className="border border-gray-300 px-4 py-2 text-[#1E90FF]">
            Dawn
          </th>
          <th className="border border-gray-300 px-4 py-2 text-[#4B0082]">
            Dusk
          </th>
          <th className="border border-gray-300 px-4 py-2 text-[#FFA500]">
            Golden Hour
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ date, sunrise, sunset, dawn, dusk, golden_hour }) => (
          <tr key={date}>
            <td className="border border-gray-300 px-4 py-2">{date}</td>
            <td className="border border-gray-300 px-4 py-2">
              {sunrise || "N/A"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sunset || "N/A"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {dawn || "N/A"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {dusk || "N/A"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {golden_hour || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

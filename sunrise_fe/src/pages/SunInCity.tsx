import { useParams } from "react-router-dom";

export default function SunInCity() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-orange-600">Sun in City: {id}</h1>
    </div>
  );
}

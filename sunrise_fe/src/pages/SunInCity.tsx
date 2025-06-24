import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQueryParams } from "../hooks/useQueryParams";
import type { SunEventsResponse } from "../types/sun";
import { useEffect, useState } from "react";
import { getSunEvents } from "../services/sun_events";
import RootLayout from "../components/common/RootLayout";
import SunChart from "../components/SunChart";
import SunTable from "../components/SunTable";
import { Tabs } from "@mantine/core";
import { GoSun } from "react-icons/go";
export default function SunInCity() {
  const { id } = useParams();
  const { getQueryParam } = useQueryParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dateStartParam = getQueryParam("date_start");
  const dateEndParam = getQueryParam("date_end");
  const dateStart = dateStartParam || null;
  const dateEnd = dateEndParam || null;

  const [data, setData] = useState<SunEventsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getSunEvents({ id, dateStart, dateEnd })
      .then((res) => {
        if (res !== undefined) setData(res);
      })
      .finally(() => setLoading(false));
  }, [id, dateStart, dateEnd]);

  function goToSearch() {
    navigate({
      pathname: "/search",
      search: location.search,
    });
  }
  return (
    <RootLayout>
      <button onClick={goToSearch} className="px-4 py-2">
        <span className="font-extrabold text-xs"> {"<"} Back</span>
      </button>
      {loading && <p>Loading sun data...</p>}
      {!loading && data && (
        <div className="mt-6 ">
          <p className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            Sun in <span className="text-[#228be6]">{data.city}</span>{" "}
            <GoSun className="text-amber-600" />
          </p>
          <Tabs defaultValue="chart" className="mt-6 mx-5">
            <Tabs.List>
              <Tabs.Tab value="chart">Chart</Tabs.Tab>
              <Tabs.Tab value="table">Table</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="chart" pt="xs">
              <SunChart data={data.data} />
            </Tabs.Panel>

            <Tabs.Panel value="table" pt="xs">
              <SunTable data={data.data} />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </RootLayout>
  );
}

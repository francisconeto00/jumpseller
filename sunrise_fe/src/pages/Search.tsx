import { useState, useEffect } from "react";
import SearchInput from "../components/common/SearchInput";
import { Button } from "@mantine/core";
import { useQueryParams } from "../hooks/useQueryParams";
import { getCities } from "../services/cities";
import type { CitiesResponse } from "../types/city";
import CityResultsGrid from "../components/CityResultsGrid";
import DateRangeInput from "../components/common/QueryDateRangePicker";

export default function Search() {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [results, setResults] = useState<CitiesResponse | null>(null);
  const pageParam = getQueryParam("page");
  const qParam = getQueryParam("q");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const search = qParam || "";

  const fetchData = async () => {
    const response = await getCities({ search, page });
    setResults(response);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearchClick = () => {
    if (page !== 1) {
      setQueryParam("page", 1);
    } else {
      fetchData();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-rose-600">
        Francisco Neto {"<>"} Jumpseller{" "}
      </h1>
      <div className="flex flex-row justify-evenly items-center mt-10">
        <SearchInput />
        <DateRangeInput />
        <Button className="w-full max-w-md" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      <div className="mt-15">
        {results ? (
          results.cities.length > 0 ? (
            <CityResultsGrid cities={results.cities} meta={results.meta} />
          ) : (
            <p className=" text-center">No cities found.</p>
          )
        ) : null}
      </div>
    </div>
  );
}

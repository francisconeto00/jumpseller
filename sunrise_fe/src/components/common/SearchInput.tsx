import { useEffect, useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import { TextInput } from "@mantine/core";

export default function SearchInput() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const initialQuery = getQueryParam("q") || "";
  const [search, setSearch] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQueryParam("q", search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <TextInput
      placeholder="Search a city"
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
      className="w-full max-w-md"
    />
  );
}

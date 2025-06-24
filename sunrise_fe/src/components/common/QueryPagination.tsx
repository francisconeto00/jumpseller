import { Pagination as MantinePagination } from "@mantine/core";
import type { Pagination } from "../../types/pagination";
import { useQueryParams } from "../../hooks/useQueryParams";

interface Props {
  pagination: Pagination;
}

export default function QueryPagination({ pagination }: Props) {
  const { setQueryParam } = useQueryParams();

  const handlePageChange = (page: number) => {
    setQueryParam("page", page.toString());
  };

  return (
    <div className="flex justify-center mt-6">
      {pagination.total_pages > 1 && (
        <MantinePagination
          value={pagination.page}
          onChange={handlePageChange}
          total={pagination.total_pages}
        />
      )}
    </div>
  );
}

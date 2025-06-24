import { Card, Text, SimpleGrid, Title } from "@mantine/core";
import type { CitiesResponse } from "../types/city";
import QueryPagination from "./common/QueryPagination";
import { useNavigate, useLocation } from "react-router-dom";

export default function CityResultsGrid({ cities, meta }: CitiesResponse) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (id: number) => {
    navigate({
      pathname: `/sun-in-city/${id}`,
      search: location.search,
    });
  };
  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {cities.map((city) => (
          <Card
            key={city.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => handleCardClick(city.id)}
          >
            <Title order={4}>{city.name}</Title>
            <Text size="sm" c="dimmed">
              {city.country}
            </Text>
            <Text size="sm">Lat: {city.lat}</Text>
            <Text size="sm">Long: {city.long}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <QueryPagination pagination={meta} />
    </div>
  );
}

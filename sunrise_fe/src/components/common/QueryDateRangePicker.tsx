import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { useQueryParams } from "../../hooks/useQueryParams";
import { Popover, Button } from "@mantine/core";
import { CiCalendar } from "react-icons/ci";

export default function DateRangeInput() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const startString = getQueryParam("date_start");
  const endString = getQueryParam("date_end");

  const [value, setValue] = useState<[string | null, string | null]>([
    startString,
    endString,
  ]);
  const [opened, setOpened] = useState(false);

  const formatDateRange = () => {
    if (value[0] && value[1]) {
      if (value[0] == value[1]) {
        return value[0];
      }
      return `${value[0]} - ${value[1]}`;
    }
    return "Select Date";
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width="auto"
      position="bottom-start"
      shadow="md"
    >
      <Popover.Target>
        <Button
          onClick={() => setOpened((o) => !o)}
          variant="default"
          leftSection={<CiCalendar size={18} />}
          className="w-full max-w-md"
        >
          {formatDateRange()}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          type="range"
          value={value}
          onChange={(val) => {
            if (Array.isArray(val)) {
              setValue([val[0], val[1]]);
              if (val[0]) {
                setQueryParam("date_start", val[0] ?? null);
              }
              if (val[1]) {
                setQueryParam("date_end", val[1] ?? null);
              }
            } else {
              setValue([null, null]);
              setQueryParam("date_start", null);
              setQueryParam("date_end", null);
            }
          }}
          allowSingleDateInRange
        />
      </Popover.Dropdown>
    </Popover>
  );
}

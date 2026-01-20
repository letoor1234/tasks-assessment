import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const formatDisplayDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatISODate = (date) => (date ? date.toISOString().split("T")[0] : "");

const parseISODate = (value) => {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
};

const DateInput = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(() => parseISODate(value));
  const [month, setMonth] = useState(() => parseISODate(value));

  useEffect(() => {
    const parsed = parseISODate(value);
    setDate(parsed);
    setMonth(parsed);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex items-center cursor-pointer">
          <Input
            value={formatDisplayDate(date)}
            placeholder="December 15, 2024"
            className="bg-background pr-10 cursor-pointer"
            readOnly
          />

          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 size-6 p-0 pointer-events-none"
          >
            <CalendarIcon className="size-4" />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        sideOffset={8}
      >
        <Calendar
          mode="single"
          selected={date}
          month={month}
          onMonthChange={setMonth}
          onSelect={(selected) => {
            if (!selected) return;

            setDate(selected);
            setOpen(false);
            onChange?.(formatISODate(selected));
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;

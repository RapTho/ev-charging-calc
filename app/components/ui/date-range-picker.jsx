"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarDateRangePicker({
  className,
  start,
  setStart,
  end,
  setEnd,
}) {
  const [range, setRange] = React.useState({
    from: start,
    to: end,
  });
  const [pendingFrom, setPendingFrom] = React.useState(null);

  React.useEffect(() => {
    setRange({
      from: start,
      to: end,
    });
  }, [start, end]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range ? (
              range.from ? (
                range.to ? (
                  <>
                    {format(range.from, "dd. LLL y")} -{" "}
                    {format(range.to, "dd. LLL y")}
                  </>
                ) : (
                  format(range.from, "dd. LLL y")
                )
              ) : (
                <span>Pick a date range</span>
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range ? range.from : null}
            selected={range}
            onSelect={(r) => {
              // Keep visual selection in sync but do not trigger fetch here.
              setRange(r);
            }}
            onDayClick={(day) => {
              // First click: set pendingFrom (user is selecting the start)
              if (!pendingFrom) {
                setPendingFrom(day);
                setRange({ from: day, to: undefined });
                return;
              }

              // If second click is before the pendingFrom, treat it as a new pendingFrom
              // and wait for another click to become the 'to' date.
              if (day < pendingFrom) {
                setPendingFrom(day);
                setRange({ from: day, to: undefined });
                return;
              }

              // Otherwise finalize the range (allow same-day ranges)
              const fromDate = pendingFrom;
              const toDate = day;

              setRange({ from: fromDate, to: toDate });
              setStart(Date.parse(fromDate));
              setEnd(Date.parse(toDate));
              setPendingFrom(null);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

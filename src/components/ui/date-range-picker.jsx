"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
            onSelect={(range) => {
              setRange(range);
              if (range && range.from && range.to) {
                setStart(Date.parse(range.from));
                setEnd(Date.parse(range.to));
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

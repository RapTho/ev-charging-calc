"use client";

import React, { useEffect, useState } from "react";
import { subDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import BarChart from "@/components/BarChart";

export default function DashboardPage() {
  const [start, setStart] = useState(Date.parse(subDays(Date.now(), 31)));
  const [end, setEnd] = useState(Date.now());
  const [data, setData] = useState([]);
  const [kWh, setkWh] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    setPrice(localStorage.getItem("price"));

    const fetchData = async () => {
      const response = await fetch(
        `/api/getData/?start=${encodeURI(start)}&end=${encodeURI(end)}`,
        {
          headers: {
            Authorization: `${authString}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);

        const total = data.reduce(
          (accumulator, currentValue) => accumulator + currentValue.Consumption,
          0
        );
        setkWh(total.toFixed(2));
      }
    };

    fetchData();
  }, [start, end]);

  return (
    <div className="flex-col md:flex-row">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <CalendarDateRangePicker
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
            />
            <Button
              className="text-base font-medium"
              onClick={() => {
                const now = Date.now();
                const lastWeek = Date.parse(subDays(Date.now(), 7));
                setEnd(now);
                setStart(lastWeek);
              }}
            >
              Last week
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <Card className="row-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cost</CardTitle>
                  <text
                    x="0"
                    y="18"
                    fontFamily="Arial"
                    fontSize="24"
                    fill="black"
                  >
                    CHF
                  </text>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    CHF {(kWh * price).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    @ {price} CHF/kWh
                  </p>
                </CardContent>
              </Card>
              <Card className="row-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Consumption
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M13 10l-4 6h3l-1 6 8-10h-3l2-8z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kWh}</div>
                  <p className="text-xs text-muted-foreground">kWh</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average charge
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="6" y1="12" x2="18" y2="12" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(kWh / data.length).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">kWh</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Number of charges
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <text
                      x="0"
                      y="18"
                      fontFamily="Arial"
                      fontSize="24"
                      fill="black"
                    >
                      #
                    </text>
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.length}</div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Charges</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart data={data} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

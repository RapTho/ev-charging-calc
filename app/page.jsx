"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import BarChart from "@/components/BarChart";

const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
const end = process.env.END || Date.now();

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [kWh, setkWh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getData/?start=${encodeURI(start)}&end=${encodeURI(end)}`
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
  }, []);

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Save</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cost</CardTitle>
                  <text
                    x="0"
                    y="18"
                    font-family="Arial"
                    font-size="24"
                    fill="black"
                  >
                    CHF
                  </text>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    CHF {(kWh * 0.3).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">@ 0.3 CHF/kWh</p>
                </CardContent>
              </Card>
              <Card>
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
                    class="h-4 w-4 text-muted-foreground"
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
                      font-family="Arial"
                      font-size="24"
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

"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type MonthlyCost = {
  /** Month as "YYYY-MM". */
  month: string;
  /** Total maintenance cost in dollars for that month. */
  cost: number;
};

const chartConfig = {
  cost: { label: "Cost", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Fixed English names (not Intl) so server and client render the same text.
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthName(month: string) {
  return MONTHS[Number(month.slice(5, 7)) - 1] ?? month;
}

const formatDollars = (value: number) => `$${value.toLocaleString("en-US")}`;

/** Bar chart of maintenance spending per month (single series). */
export function MaintenanceCostChart({ data }: { data: MonthlyCost[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
      <BarChart
        data={data}
        accessibilityLayer
        margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(month: string) => monthName(month).slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(value: number) => formatDollars(value)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(_, payload) => {
                const month = payload?.[0]?.payload?.month as
                  string | undefined;
                return month ? `${monthName(month)} ${month.slice(0, 4)}` : "";
              }}
              formatter={(value) => (
                <span className="font-medium tabular-nums text-foreground">
                  {formatDollars(Number(value))}
                </span>
              )}
            />
          }
        />
        <Bar
          dataKey="cost"
          fill="var(--color-cost)"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ChartContainer>
  );
}

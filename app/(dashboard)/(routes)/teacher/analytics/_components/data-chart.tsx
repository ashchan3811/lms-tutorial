"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const DataChart = ({ data }: ChartProps) => {
  return (
    <Card className="pt-4">
      {data.length > 0 ? (
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey={"name"}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatPrice(value)}
            />
            <Bar dataKey={"total"} fill="#0369a1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-xl text-muted-foreground">No data to display</p>
      )}
    </Card>
  );
};

export default DataChart;

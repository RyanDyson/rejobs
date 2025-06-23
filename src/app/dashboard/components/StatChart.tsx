"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { DisplayText } from "@/components/global/display-text";

const timelineData = [
  { month: "Jan", applications: 4, interviews: 8, offers: 1 },
  { month: "Feb", applications: 6, interviews: 12, offers: 2 },
  { month: "Mar", applications: 8, interviews: 15, offers: 1 },
  { month: "Apr", applications: 5, interviews: 10, offers: 3 },
  { month: "May", applications: 7, interviews: 18, offers: 2 },
  { month: "Jun", applications: 9, interviews: 22, offers: 4 },
  { month: "Jul", applications: 12, interviews: 25, offers: 3 },
  { month: "Aug", applications: 10, interviews: 20, offers: 2 },
  { month: "Sep", applications: 15, interviews: 28, offers: 5 },
  { month: "Oct", applications: 11, interviews: 24, offers: 4 },
  { month: "Nov", applications: 13, interviews: 30, offers: 6 },
  { month: "Dec", applications: 16, interviews: 35, offers: 7 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-1)",
  },
  interviews: {
    label: "Practice Sessions",
    color: "var(--chart-4)",
  },
  offers: {
    label: "Offers",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function StatChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>
          <DisplayText className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#009758]" />
            Progress Over Time
          </DisplayText>
        </CardTitle>
        <CardDescription>
          Track your applications, interviews, and offers monthly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={timelineData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-applications)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-appplications)"
                  stopOpacity={0.6}
                />
              </linearGradient>
              <linearGradient id="fillInterviews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-interviews)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-interviews)"
                  stopOpacity={0.6}
                />
              </linearGradient>
              <linearGradient id="fillOffers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-offers)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-offers)"
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="applications"
              type="natural"
              fill="url(#fillApplications)"
              stroke="var(--color-applications)"
              strokeWidth={3}
              fillOpacity={0.4}
              stackId={"a"}
            />
            <Area
              dataKey="interviews"
              type="natural"
              fill="url(#fillInterviews)"
              stroke="var(--color-interviews)"
              strokeWidth={3}
              fillOpacity={0.4}
              stackId={"a"}
            />
            <Area
              dataKey="offers"
              type="natural"
              fill="url(#fillOffers)"
              stroke="var(--color-offers)"
              strokeWidth={3}
              fillOpacity={0.4}
              stackId={"a"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

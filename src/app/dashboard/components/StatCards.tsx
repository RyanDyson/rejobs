"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisplayText } from "@/components/global/display-text";
import { LucideIcon } from "lucide-react";
import { Briefcase, Clock, MessageSquare, TrendingUp } from "lucide-react";

type StatData = {
  stats: number;
  change: number;
};

type StatConfig = {
  title: string;
  icon: LucideIcon;
  description: string;
  formatValue?: (value: number) => string;
};

const STAT_CONFIGS: StatConfig[] = [
  {
    title: "Jobs Applied",
    icon: Briefcase,
    description: "This month",
  },
  {
    title: "Active Applications",
    icon: Clock,
    description: "Pending responses",
  },
  {
    title: "Interviews Practiced",
    icon: MessageSquare,
    description: "Total sessions",
  },
  {
    title: "Success Rate",
    icon: TrendingUp,
    description: "Interview to offer",
    formatValue: (value) => `${value}%`,
  },
];

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  description: string;
}) => {
  const isPositive = change >= 0;
  const changeText = `${change > 0 ? "+" : ""}${change}`;

  return (
    <Card className="@container transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <DisplayText className="font-medium text-white text-lg">
            {title}
          </DisplayText>
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="flex h-full flex-col @2xs:flex-row justify-between items-center space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        <Badge
          variant={isPositive ? "default" : "destructive"}
          className={
            isPositive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
          }
        >
          {changeText}, <span>{description}</span>
        </Badge>
      </CardContent>
    </Card>
  );
};

type StatCardsProps = {
  data: StatData[];
};

export function StatCards({ data }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {STAT_CONFIGS.map((config, index) => {
        const statData = data[index] || { stats: 0, change: 0 };
        const formattedValue = config.formatValue
          ? config.formatValue(statData.stats)
          : statData.stats.toString();

        return (
          <StatCard
            key={config.title}
            title={config.title}
            value={formattedValue}
            change={statData.change}
            icon={config.icon}
            description={config.description}
          />
        );
      })}
    </div>
  );
}

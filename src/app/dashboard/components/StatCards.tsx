import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisplayText } from "@/components/global/display-text";
import { LucideIcon } from "lucide-react";

type StatsData = {
  title: string;
  displayValue?: string;
  change: string | number;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  description: string;
};

const StatCard = (stat: StatsData) => {
  return (
    <Card className="@container transition-all duration-300 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <DisplayText className="font-medium text-white text-lg">
            {stat.title}
          </DisplayText>
        </CardTitle>
        <stat.icon className="h-4 w-4 text-[#009758]" />
      </CardHeader>
      <CardContent className="flex h-full flex-col @2xs:flex-row justify-between items-center space-y-2">
        <div className="text-2xl font-bold">{stat.displayValue}</div>
        <Badge
          variant={stat.changeType === "positive" ? "default" : "destructive"}
          className={
            stat.changeType === "positive"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : ""
          }
        >
          {stat.change},<span>{stat.description}</span>
        </Badge>
      </CardContent>
    </Card>
  );
};

export function StatCards({ data }: { data: StatsData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {data.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

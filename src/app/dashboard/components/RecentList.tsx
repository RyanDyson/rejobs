import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Building } from "lucide-react";
import { DisplayText } from "@/components/global/display-text";
import { LucideIcon } from "lucide-react";
import { Briefcase, MessageSquare, Calendar, CheckCircle } from "lucide-react";

export enum Status {
  submitted = "submitted",
  completed = "completed",
  action_required = "action required",
  viewed = "viewed",
}
const recentActivity = [
  {
    type: "application",
    title: "Applied to Senior Frontend Developer",
    company: "TechCorp Inc.",
    time: "2 hours ago",
    status: Status.submitted,
    icon: Briefcase,
  },
  {
    type: "interview",
    title: "Completed practice session",
    company: "Technical Interview - React",
    time: "5 hours ago",
    status: Status.completed,
    icon: MessageSquare,
  },
  {
    type: "response",
    title: "Interview invitation received",
    company: "StartupXYZ",
    time: "1 day ago",
    status: Status.action_required,
    icon: Calendar,
  },
  {
    type: "application",
    title: "Application viewed",
    company: "BigTech Corp",
    time: "2 days ago",
    status: Status.viewed,
    icon: CheckCircle,
  },
];

export type RecentActivity = (typeof recentActivity)[number];

const ActivityItem = ({
  activity,
}: {
  activity: {
    title: string;
    company: string;
    time: string;
    status: Status;
    icon: LucideIcon;
  };
}) => {
  return (
    <div className="@container flex items-center gap-4 py-4 px-2 ">
      <div className="p-2 rounded-full bg-white">
        <activity.icon className="h-4 w-4 text-[#009758]" />
      </div>
      <div className="flex @lg:flex-row gap-y-2 items-start @lg:items-center w-full flex-col justify-between">
        <div className="text-muted-foreground text-xs flex justify-start items-center gap-2">
          <span className="text-white font-medium text-sm w-fit">
            {activity.title}
          </span>
          <span>•</span>
          <Building className="h-3 w-3" />
          <span>{activity.company}</span>
        </div>
        <div className="@lg:min-w-48 justify-between flex @lg:flex-row flex-col gap-y-2 @lg:items-center gap-2 text-xs text-muted-foreground mt-1">
          <Badge
            variant={
              activity.status === Status.completed
                ? "default"
                : activity.status === Status.action_required
                ? "default"
                : "secondary"
            }
            className={
              activity.status === Status.completed
                ? "bg-green-100 text-green-800"
                : activity.status === Status.action_required
                ? "bg-red-50 text-red-800"
                : "bg-blue-100 text-blue-800"
            }
          >
            {activity.status.replace("_", " ")}
          </Badge>
          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

export function RecentList({
  data = recentActivity,
}: {
  data: RecentActivity[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <DisplayText className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#009758]" />
            Recent Activity
          </DisplayText>
        </CardTitle>
        <CardDescription>
          Your latest job search and interview activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-accent">
          {data.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

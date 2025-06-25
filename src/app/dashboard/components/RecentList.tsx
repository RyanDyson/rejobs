"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Building,
  CheckCircle,
  AlertCircle,
  Send,
  Eye,
} from "lucide-react";
import { DisplayText } from "@/components/global/display-text";

export enum Status {
  submitted = "submitted",
  completed = "completed",
  action_required = "action_required",
  viewed = "viewed",
}

type RecentActivity = {
  title: string;
  company: string;
  time: string;
  status: Status;
};

const STATUS_CONFIG = {
  [Status.completed]: {
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-100",
    icon: CheckCircle,
  },
  [Status.action_required]: {
    variant: "default" as const,
    className: "bg-red-50 text-red-800 hover:bg-red-50",
    icon: AlertCircle,
  },
  [Status.submitted]: {
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    icon: Send,
  },
  [Status.viewed]: {
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    icon: Eye,
  },
};

const ActivityItem = ({ activity }: { activity: RecentActivity }) => {
  // Add fallback for undefined status
  const activityStatus = activity.status || Status.viewed;
  const statusConfig =
    STATUS_CONFIG[activityStatus] || STATUS_CONFIG[Status.viewed];
  const formattedStatus = activityStatus
    ? activityStatus.replace("_", " ")
    : "unknown";
  const IconComponent = statusConfig.icon;

  // Add fallbacks for other potentially undefined properties
  const title = activity.title || "Unknown Activity";
  const company = activity.company || "Unknown Company";
  const time = activity.time || "Unknown time";

  return (
    <div className="@container flex items-center gap-4 py-4 px-2">
      <div className="p-2 rounded-full bg-white">
        <IconComponent className="h-4 w-4 text-primary" />
      </div>

      <div className="flex @lg:flex-row gap-y-2 items-start @lg:items-center w-full flex-col justify-between">
        <div className="text-muted-foreground text-xs flex justify-start items-center gap-2">
          <span className="text-white font-medium text-sm w-fit">{title}</span>
          <span>•</span>
          <Building className="h-3 w-3" />
          <span>{company}</span>
        </div>

        <div className="@lg:min-w-48 justify-between flex @lg:flex-row flex-col gap-y-2 @lg:items-center gap-2 text-xs text-muted-foreground mt-1">
          <Badge
            variant={statusConfig.variant}
            className={statusConfig.className}
          >
            {formattedStatus}
          </Badge>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

type RecentListProps = {
  data: RecentActivity[];
};

export function RecentList({ data }: RecentListProps) {
  // Add fallback for empty or undefined data
  const activities = data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <DisplayText className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </DisplayText>
        </CardTitle>
        <CardDescription>
          Your latest job search and interview activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="divide-y divide-accent">
            {activities.map((activity, index) => (
              <ActivityItem
                key={`${activity?.title || "activity"}-${
                  activity?.time || "time"
                }-${index}`}
                activity={activity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity found</p>
            <p className="text-sm">
              Your activities will appear here once you start using the platform
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

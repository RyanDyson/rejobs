"use client";

import {
  Briefcase,
  Clock,
  MessageSquare,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { StatCards } from "./components/StatCards";
import { EasySearch } from "./components/EasySearch";
import { RecentList } from "./components/RecentList";
import { StatChart } from "./components/StatChart";
import { Status } from "./components/RecentList";

export default function OverviewPage() {
  // Mock data for demonstration
  const statsData = [
    {
      title: "Jobs Applied",
      displayValue: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Briefcase,
      description: "This month",
    },
    {
      title: "Active Applications",
      displayValue: "8",
      change: "+3",
      changeType: "positive" as const,
      icon: Clock,
      description: "Pending responses",
    },
    {
      title: "Interviews Practiced",
      displayValue: "47",
      change: "+23%",
      changeType: "positive" as const,
      icon: MessageSquare,
      description: "Total sessions",
    },
    {
      title: "Success Rate",
      displayValue: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Interview to offer",
    },
  ];

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

  // Recent activity data

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      {/* Stats Cards */}
      <StatCards data={statsData} />
      {/* Easy Search Section */}
      <EasySearch />
      {/* Recent Activity */}
      <RecentList data={recentActivity} />
      {/* Timeline Chart */}
      <StatChart />
    </div>
  );
}

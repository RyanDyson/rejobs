import { StatCards } from "./components/StatCards";
import { EasySearch } from "./components/EasySearch";
import { RecentList, Status } from "./components/RecentList";
import { StatChart } from "./components/StatChart";

export default function OverviewPage() {
  const tempData = [
    {
      stats: 10,
      change: 2,
    },
    {
      stats: 5,
      change: -1,
    },
    {
      stats: 20,
      change: 3,
    },
    {
      stats: 75,
      change: 5,
    },
  ];

  const recentActivity = [
    {
      title: "Completed React Developer Interview Practice",
      company: "Meta Practice Room",
      time: "2 hours ago",
      status: Status.completed,
    },
    {
      title: "Applied for Senior Frontend Engineer",
      company: "Google",
      time: "4 hours ago",
      status: Status.submitted,
    },
    {
      title: "Follow up required for Software Engineer role",
      company: "Microsoft",
      time: "1 day ago",
      status: Status.action_required,
    },
    {
      title: "Application viewed by recruiter",
      company: "Apple",
      time: "2 days ago",
      status: Status.viewed,
    },
    {
      title: "Completed System Design Interview Practice",
      company: "Amazon Practice Room",
      time: "3 days ago",
      status: Status.completed,
    },
    {
      title: "Applied for Full Stack Developer",
      company: "Netflix",
      time: "4 days ago",
      status: Status.submitted,
    },
    {
      title: "Portfolio review needed for UI/UX Designer",
      company: "Figma",
      time: "5 days ago",
      status: Status.action_required,
    },
    {
      title: "Application status updated",
      company: "Spotify",
      time: "1 week ago",
      status: Status.viewed,
    },
    {
      title: "Completed Behavioral Interview Practice",
      company: "Tesla Practice Room",
      time: "1 week ago",
      status: Status.completed,
    },
    {
      title: "Applied for DevOps Engineer",
      company: "Airbnb",
      time: "1 week ago",
      status: Status.submitted,
    },
  ];

  return (
    <div className="p-6 space-y-4 w-full mx-auto">
      {/* Stats Cards */}
      <StatCards data={tempData} />
      {/* Easy Search Section */}
      <EasySearch />
      {/* Recent Activity */}
      <RecentList data={recentActivity} />
      {/* Timeline Chart */}
      <StatChart />
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Settings,
  Maximize2,
  Users,
  BarChart3,
} from "lucide-react";

export function LaptopMockup() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Laptop Frame */}
      <div className="relative bg-zinc-800 rounded-t-2xl p-4 shadow-2xl">
        {/* Screen */}
        <div className="bg-zinc-950 rounded-lg overflow-hidden relative aspect-video">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 bg-zinc-900 px-4 py-3 border-b border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-400 text-center">
                https://re-interview.com/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 h-full bg-gradient-to-br from-zinc-950 to-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Welcome back, Sarah!
                </h1>
                <p className="text-zinc-400">
                  Ready for your next practice session?
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </Badge>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-2xl font-bold text-white mb-1">24</div>
                <div className="text-xs text-zinc-400">Sessions</div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  8.4
                </div>
                <div className="text-xs text-zinc-400">Avg Score</div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">12h</div>
                <div className="text-xs text-zinc-400">Practice Time</div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  95%
                </div>
                <div className="text-xs text-zinc-400">Confidence</div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side - Current Session */}
              <Card className="bg-zinc-900/30 border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Current Session</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300"
                  >
                    Technical Interview
                  </Badge>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 mb-4 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Alex Chen
                      </p>
                      <p className="text-blue-400 text-xs">
                        Senior Engineer @ Meta
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    "Explain the difference between SQL and NoSQL databases..."
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex-1 bg-zinc-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-xs text-zinc-400">5:23</span>
                </div>
              </Card>

              {/* Right Side - Recent Sessions */}
              <Card className="bg-zinc-900/30 border-zinc-800 p-4">
                <h3 className="text-white font-semibold mb-4">
                  Recent Sessions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        Product Manager Interview
                      </p>
                      <p className="text-zinc-400 text-xs">Score: 9.2/10</p>
                    </div>
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Sales Presentation</p>
                      <p className="text-zinc-400 text-xs">Score: 8.7/10</p>
                    </div>
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Behavioral Questions</p>
                      <p className="text-zinc-400 text-xs">Score: 8.1/10</p>
                    </div>
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative bg-zinc-700 h-8 rounded-b-2xl shadow-2xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-2 bg-zinc-600 rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        <Users className="w-4 h-4 inline mr-2" />
        2,000+ Active Users
      </div>
      <div className="absolute -bottom-4 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        <BarChart3 className="w-4 h-4 inline mr-2" />
        Advanced Analytics
      </div>
    </div>
  );
}

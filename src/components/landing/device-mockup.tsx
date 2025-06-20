import { Badge } from "@/components/ui/badge";
import { User, Play } from "lucide-react";

export function DeviceMockup() {
  return (
    <div className="relative max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border border-zinc-700">
        {/* Screen */}
        <div className="bg-zinc-950 rounded-[2rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white/60 rounded-sm"></div>
              <div className="w-6 h-2 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* App Content */}
          <div className="px-4 pb-6">
            {" "}
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  Interview Practice
                </h3>
                <p className="text-zinc-400 text-sm">
                  Software Engineer @ Google
                </p>
              </div>
              <div className="w-10 h-10 bg-[#009758] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
            {/* AI Agent Video Interface */}
            <div className="relative bg-gradient-to-br from-[#009758]/10 to-[#009758]/5 rounded-xl mb-4 border border-[#009758]/20 overflow-hidden">
              {/* Video Area */}
              <div className="relative aspect-video bg-zinc-900 rounded-t-xl overflow-hidden">
                <img
                  src="/previews/preview_target-katya.jpg"
                  alt="AI Agent Katya"
                  className="w-full h-full object-cover"
                />
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Live indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-medium">LIVE</span>
                </div>

                {/* Agent info */}
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold text-sm">Katya</p>
                  <p className="text-xs text-zinc-300">
                    Senior Tech Interviewer
                  </p>
                </div>

                {/* Play/Pause button */}
                <div className="absolute bottom-3 right-3">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Speech bubble */}
              <div className="p-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    &ldquo;Tell me about a time you had to work with a difficult
                    team member. How did you handle it?&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge
                    variant="secondary"
                    className="bg-[#009758]/20 text-[#009758] text-xs border-[#009758]/30"
                  >
                    Behavioral Question
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <div className="w-1 h-1 bg-[#009758] rounded-full animate-pulse"></div>
                    <span>Speaking...</span>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* User Response Area */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-[#009758] rounded-full"></div>
                <span className="text-zinc-300 text-sm">Your Response</span>
              </div>
              <div className="h-16 bg-zinc-900/50 rounded-lg flex items-center justify-center border border-zinc-700/50">
                <div className="flex items-center gap-2 text-zinc-500">
                  <div className="w-2 h-2 bg-[#009758] rounded-full animate-pulse"></div>
                  <span className="text-sm">Listening...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        95% Success Rate
      </div>
      <div className="absolute -bottom-2 -left-4 bg-background border-primary border text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        Real-time Feedback
      </div>
    </div>
  );
}

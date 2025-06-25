import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";
import { ConnectionQuality } from "@heygen/streaming-avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const StateBadge = ({
  sessionState,
  connectionQuality,
}: {
  sessionState: StreamingAvatarSessionState;
  connectionQuality: ConnectionQuality;
}) => {
  const isActive = sessionState === StreamingAvatarSessionState.CONNECTED;
  const isConnecting = sessionState === StreamingAvatarSessionState.CONNECTING;

  const getBadgeVariant = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "default";
        case ConnectionQuality.BAD:
          return "destructive";
        case ConnectionQuality.UNKNOWN:
        default:
          return "secondary";
      }
    }
    return sessionState === StreamingAvatarSessionState.INACTIVE
      ? "outline"
      : "secondary";
  };

  const getBadgeStyles = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "bg-emerald-800 hover:bg-emerald-800 text-white border-emerald-300 dark:bg-emerald-900 dark:hover:bg-emerald-900 dark:border-emerald-400";
        case ConnectionQuality.BAD:
          return "bg-red-800 hover:bg-red-800 text-white border-red-300 dark:bg-red-900 dark:hover:bg-red-900 dark:border-red-400";
        case ConnectionQuality.UNKNOWN:
        default:
          return "bg-gray-800 hover:bg-gray-800 text-white border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-900 dark:border-gray-400";
      }
    }
    return sessionState === StreamingAvatarSessionState.INACTIVE
      ? "bg-indigo-800 hover:bg-indigo-800 text-white border-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-900 dark:border-indigo-400"
      : "bg-amber-800 hover:bg-amber-800 text-white border-amber-300 dark:bg-amber-900 dark:hover:bg-amber-900 dark:border-amber-400";
  };

  const getDotStyles = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "bg-emerald-200 dark:bg-emerald-300";
        case ConnectionQuality.BAD:
          return "bg-red-200 dark:bg-red-300";
        case ConnectionQuality.UNKNOWN:
        default:
          return "bg-gray-200 dark:bg-gray-300";
      }
    }
    return sessionState === StreamingAvatarSessionState.INACTIVE
      ? "bg-indigo-200 dark:bg-indigo-300"
      : "bg-amber-200 dark:bg-amber-300";
  };

  const getDisplayText = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "Good Connection";
        case ConnectionQuality.BAD:
          return "Poor Connection";
        case ConnectionQuality.UNKNOWN:
        default:
          return "Analyzing Connection...";
      }
    }
    if (isConnecting) {
      return "Loading...";
    }
    return "Ready";
  };

  return (
    <Badge
      variant={getBadgeVariant()}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border",
        getBadgeStyles()
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0",
          getDotStyles(),
          isConnecting && "animate-pulse"
        )}
      />
      <span className="whitespace-nowrap">{getDisplayText()}</span>
    </Badge>
  );
};

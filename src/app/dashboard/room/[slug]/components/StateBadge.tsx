import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";
import { ConnectionQuality } from "@heygen/streaming-avatar";

export const StateBadge = ({
  sessionState,
  connectionQuality,
}: {
  sessionState: StreamingAvatarSessionState;
  connectionQuality: ConnectionQuality;
}) => {
  const isActive = sessionState === StreamingAvatarSessionState.CONNECTED;
  const isConnecting = sessionState === StreamingAvatarSessionState.CONNECTING;

  const getBadgeStyles = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "bg-emerald-100 border-emerald-500";
        case ConnectionQuality.BAD:
          return "bg-red-100 border-red-500";
        case ConnectionQuality.UNKNOWN:
        default:
          return "bg-gray-100 border-gray-500";
      }
    }
    return sessionState === StreamingAvatarSessionState.INACTIVE
      ? "bg-indigo-100 border-indigo-500"
      : "bg-amber-100 border-amber-500";
  };

  const getDotStyles = () => {
    if (isActive) {
      switch (connectionQuality) {
        case ConnectionQuality.GOOD:
          return "bg-emerald-500";
        case ConnectionQuality.BAD:
          return "bg-red-500";
        case ConnectionQuality.UNKNOWN:
        default:
          return "bg-gray-500";
      }
    }
    return sessionState === StreamingAvatarSessionState.INACTIVE
      ? "bg-indigo-500"
      : "bg-amber-500";
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
    <div
      className={`flex items-center gap-2 ${getBadgeStyles()} rounded-full p-2 border text-sm px-4`}
    >
      <div className={`w-3 h-3 rounded-full ${getDotStyles()}`} />
      <span>{getDisplayText()}</span>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";
import { LoadingIcon } from "@/components/global/loading-icon";
import { StreamingEvents } from "@heygen/streaming-avatar";

type Props = {
  streamState: StreamingAvatarSessionState;
  startRecording: () => void;
  stopRecording: () => void;
  avatarState: StreamingEvents;
};

export const ChatButton = ({
  streamState,
  startRecording,
  stopRecording,
}: Props) => {
  switch (streamState) {
    case StreamingAvatarSessionState.CONNECTED:
      return (
        <Button
          onClick={stopRecording}
          className="flex items-center gap-2 cursor-pointer"
        >
          <StopCircle className="h-4 w-4" />
          Stop chat with AI
        </Button>
      );
    case StreamingAvatarSessionState.CONNECTING:
      return (
        <Button disabled variant="outline" className="flex items-center gap-2">
          <LoadingIcon className="h-4 w-4 animate-spin" />
          Connecting...
        </Button>
      );
    case StreamingAvatarSessionState.INACTIVE:
      return (
        <Button
          onClick={startRecording}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Mic className="h-4 w-4" />
          Start chat with AI
        </Button>
      );
    default:
      return null;
  }
};

"use client";

import { useEffect } from "react";
import { RoomDetailSection } from "./components/RoomDetailSection";
import { HeyGenControls } from "./components/HeyGenControls";
import { HeyGenVideo } from "./components/HeyGenVideo";
import { HeyGenChat } from "./components/HeyGenChat";
import { type room } from "@/server/db/schema";
import { StreamingAvatarProvider } from "@/hooks/avatar-utils";
import {
  AvatarQuality,
  ElevenLabsModel,
  StartAvatarRequest,
  STTProvider,
  VoiceChatTransport,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { AVATARS } from "@/lib/heygen-constants";
import { SpeakRequest, TaskMode, TaskType } from "@heygen/streaming-avatar";
import { useStreamingAvatarSession } from "@/hooks/avatar-utils";
import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";

type ClientPageProps = {
  roomID: string;
  roomDetails: { left: string; right: string | React.ReactNode }[];
  courseDetails: { left: string; right: string | React.ReactNode }[];
  apiRes: room;
};

export function ClientPage({
  roomID,
  roomDetails,
  courseDetails,
  apiRes,
}: ClientPageProps) {
  const { sessionState } = useStreamingAvatarSession();

  useEffect(() => {
    if (sessionState === StreamingAvatarSessionState.CONNECTED) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();

        // failsafe for chrome
        event.returnValue =
          "Are you sure you want to leave? Your session progress may be lost.";

        return "Are you sure you want to leave? Your session progress may be lost.";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [sessionState]);

  const startRequest: StartAvatarRequest = {
    quality: AvatarQuality.High,
    avatarName: AVATARS[0]?.avatar_id ?? "",
    voice: {
      rate: 1,
      emotion: VoiceEmotion.EXCITED,
      elevenlabsSettings: {
        stability: 1,
        similarity_boost: 1,
        style: 1,
        use_speaker_boost: false,
      },
      model: ElevenLabsModel.eleven_flash_v2_5,
    },
    knowledgeBase: apiRes.prompt,
    language: "en",
    disableIdleTimeout: true,
    sttSettings: {
      provider: STTProvider.DEEPGRAM,
      confidence: 0.8,
    },
    useSilencePrompt: true,
    voiceChatTransport: VoiceChatTransport.LIVEKIT,
  };

  const initialSpeakRequest: SpeakRequest = {
    text: "PROMPT:" + apiRes.prompt,
    taskType: TaskType.TALK,
    taskMode: TaskMode.ASYNC,
  };

  const DesktopLayout = ({ className }: { className: string }) => {
    return (
      <div className={className}>
        <div className="w-full grow h-full flex flex-col gap-y-2">
          <HeyGenVideo />
          <HeyGenChat prompt={apiRes.prompt} />
        </div>
        <div className="h-full w-2/5 max-w-[400px] flex flex-col gap-2">
          <RoomDetailSection
            roomDetails={roomDetails}
            courseDetails={courseDetails}
            roomID={roomID}
          />
          <HeyGenControls
            config={startRequest}
            speakRequest={initialSpeakRequest}
          />
        </div>
      </div>
    );
  };

  // console.log(fetchedConfig.Prompt);

  return (
    <StreamingAvatarProvider basePath={process.env.NEXT_PUBLIC_BASE_API_URL}>
      <DesktopLayout className="flex flex-col md:flex-row gap-2 py-4 md:gap-6 md:py-6 px-4 h-full" />
    </StreamingAvatarProvider>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatButton } from "./ChatButton";
import { toast } from "sonner";
import { useStreamingAvatarSession } from "@/hooks/avatar-utils";
import StreamingAvatar, {
  StreamingEvents,
  type StartAvatarRequest,
} from "@heygen/streaming-avatar";
import { useMemoizedFn, useUnmount } from "ahooks";
import { useConnectionQuality } from "@/hooks/avatar-utils";
import { useVoiceChat } from "@/hooks/avatar-utils";
import { motion, AnimatePresence } from "motion/react";
import { StateBadge } from "./StateBadge";
import { useInterrupt } from "@/hooks/avatar-utils";
import { useStreamingAvatarContext } from "@/hooks/avatar-utils/AvatarContextProvider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChatArea } from "./ChatArea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CogIcon } from "lucide-react";
import { AvatarSelect } from "./AvatarSelect";
import { QualitySelect } from "./QualitySelect";
import { AvatarDialog } from "./AvatarDialog";
import { SpeakRequest } from "@heygen/streaming-avatar";
import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";

export enum RecognitionMode {
  DIRECT = "direct",
  EDIT = "edit",
  TEXT_ONLY = "text_only",
}

type HeyGenControlsProps = {
  roomSlug?: string;
  config: StartAvatarRequest;
  speakRequest?: SpeakRequest;
};

export const HeyGenControls = ({
  config,
  speakRequest,
}: HeyGenControlsProps) => {
  const { initAvatar, startAvatar, stopAvatar, sessionState } =
    useStreamingAvatarSession();
  const { isAvatarTalking } = useStreamingAvatarContext();
  const { interrupt } = useInterrupt();
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
    startVoiceChat,
    stopVoiceChat,
  } = useVoiceChat();

  const { connectionQuality } = useConnectionQuality();

  const [avatarConfig, setAvatarConfig] = useState<StartAvatarRequest>(config);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  const [mode, setMode] = useState<RecognitionMode>(RecognitionMode.DIRECT);
  const [transcript] = useState("");
  const [editAreaHeight, setEditAreaHeight] = useState(0);

  const editAreaRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<StreamingAvatar | null>(null);

  const fetchAccessToken = async () => {
    try {
      const res = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await res.text();
      // console.log("Access token: ", token);
      return token;
    } catch (error) {
      toast.error("Error fetching access token: " + error);
    }
  };

  const startSessionV2 = useMemoizedFn(
    async ({ isVoiceChat }: { isVoiceChat: boolean }) => {
      try {
        const newToken = await fetchAccessToken();
        if (!newToken) {
          throw new Error("Failed to fetch access token");
        }
        const avatar = initAvatar(newToken);
        avatarRef.current = avatar;

        avatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
          // console.log("Avatar started talking", e);
        });
        avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
          // console.log("Avatar stopped talking", e);
        });
        avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
          // console.log("Stream disconnected");
        });
        avatar.on(StreamingEvents.STREAM_READY, (event) => {
          // console.log(">>>>> Stream ready:", event.detail);
        });
        avatar.on(StreamingEvents.USER_START, (event) => {
          // console.log(">>>>> User started talking:", event);
        });
        avatar.on(StreamingEvents.USER_STOP, (event) => {
          // console.log(">>>>> User stopped talking:", event);
        });
        avatar.on(StreamingEvents.USER_END_MESSAGE, (event) => {
          // console.log(">>>>> User end message:", event);
        });
        avatar.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
          // console.log(">>>>> User talking message:", event);
        });
        avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (event) => {
          // console.log(">>>>> Avatar talking message:", event);
        });
        avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
          // console.log(">>>>> Avatar end message:", event);
        });

        await startAvatar(avatarConfig);
        // console.log("Avatar started with config:", avatarConfig);

        if (isVoiceChat) {
          await avatar.startVoiceChat();
          if (speakRequest) {
            await avatar.speak(speakRequest);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Error initializing avatar: " + error);
      }
    }
  );

  useUnmount(() => {
    stopAvatar();
  });

  useEffect(() => {
    if (editAreaRef.current) {
      setEditAreaHeight(editAreaRef.current.scrollHeight);
    }
  }, [transcript, mode]);

  const handleConfirmAvatarSelection = async () => {
    await startSessionV2({ isVoiceChat: true });
    // cityu api call
  };

  const stopSession = async () => {
    stopAvatar();
    //send local message to cityu server
  };

  const handleModeChange = (value: RecognitionMode) => {
    setMode(value);
    if (value !== RecognitionMode.DIRECT) {
      stopVoiceChat();
      return;
    } else if (!isVoiceChatActive && value === RecognitionMode.DIRECT) {
      startVoiceChat();
    }
  };

  const handleStartSession = () => {
    setShowAvatarDialog(true);
  };

  const restartSession = async () => {
    try {
      await stopAvatar();
      setTimeout(async () => {
        await startSessionV2({ isVoiceChat: true });
        toast.success("Session restarted successfully");
      }, 1000);
    } catch (error) {
      console.error("Error restarting session:", error);
      toast.error("Failed to restart session: " + error);
    }
  };

  // console.log(avatarConfig);

  return (
    <div className="flex flex-col gap-4 bg-zinc-100 rounded-xl pt-4">
      <div className="flex justify-between items-center w-full gap-2 px-1">
        <StateBadge
          sessionState={sessionState}
          connectionQuality={connectionQuality}
        />
        <AvatarDialog
          open={showAvatarDialog}
          onOpenChange={setShowAvatarDialog}
          avatarConfig={avatarConfig}
          setAvatarConfig={setAvatarConfig}
          onConfirm={handleConfirmAvatarSelection}
        >
          <ChatButton
            streamState={sessionState}
            startRecording={handleStartSession}
            stopRecording={stopSession}
            avatarState={StreamingEvents.AVATAR_START_TALKING}
          />
        </AvatarDialog>
      </div>
      <AnimatePresence mode="wait">
        {sessionState === StreamingAvatarSessionState.CONNECTED && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
              height: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
              height: { duration: 0.3 },
            }}
            style={{ overflow: "hidden" }}
          >
            <Card className=" min-w-[200px] p-4 transition-all duration-300 ease-in-out flex flex-col justify-between bg-gradient-to-b from-white to-pink-100">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center gap-x-4 max-w-full text-primary flex-wrap text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  <CogIcon /> Chat Settings
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold">HeyGen Avatar Model</Label>
                  <AvatarSelect
                    open={showAvatarSelect}
                    setOpen={setShowAvatarSelect}
                    avatarConfig={avatarConfig}
                    setAvatarConfig={setAvatarConfig}
                    restartSession={restartSession}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold">Stream Quality</Label>
                  <QualitySelect
                    avatarConfig={avatarConfig}
                    setAvatarConfig={setAvatarConfig}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold">Interrupt AI</Label>
                  <Button
                    variant="outline"
                    onClick={() => interrupt()}
                    className="cursor-pointer"
                    disabled={!isAvatarTalking}
                  >
                    Interrupt AI
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold">Speech Input Mode</Label>
                  <ToggleGroup
                    type="single"
                    disabled={isVoiceChatLoading}
                    value={mode}
                    onValueChange={(value: RecognitionMode) =>
                      handleModeChange(value)
                    }
                    className="w-full p-1 gap-x-0.5 flex justify-between items-center border border-neutral-300 bg-neutral-100 rounded-sm"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <ToggleGroupItem
                            variant="outline"
                            className="w-full"
                            value={RecognitionMode.DIRECT}
                          >
                            Direct send
                          </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          Your voice will be sent directly to the AI.
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <ToggleGroupItem
                            variant="outline"
                            className="w-full"
                            value={RecognitionMode.EDIT}
                          >
                            Edit
                          </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          Your voice will be transcribed and you can edit it
                          before sending.
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <ToggleGroupItem
                            variant="outline"
                            className="w-full"
                            value={RecognitionMode.TEXT_ONLY}
                          >
                            Text only
                          </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          Only text chat mode will be enabled.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </ToggleGroup>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight:
                        mode !== RecognitionMode.DIRECT
                          ? `${editAreaHeight}px`
                          : "0px",
                      opacity: mode !== RecognitionMode.DIRECT ? 1 : 0,
                      marginTop:
                        mode === RecognitionMode.DIRECT ? "0.5rem" : "0",
                    }}
                  >
                    <ChatArea
                      ref={editAreaRef}
                      avatar={avatarRef.current}
                      recognitionMode={mode}
                      setRecognitionMode={setMode}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

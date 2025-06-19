"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2, AlertCircle } from "lucide-react";
import {
  useAudioRecording,
  RecordingState,
} from "@/hooks/avatar-utils/use-audio-recording";
import StreamingAvatar from "@heygen/streaming-avatar";
import { useStreamingAvatarContext } from "@/hooks/avatar-utils/AvatarContextProvider";
import { type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

type RecordingButtonProps = {
  avatar?: StreamingAvatar | null;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
};

export const RecordingButton = ({
  avatar,
  message,
  setMessage,
  disabled,
}: RecordingButtonProps) => {
  const { isAvatarTalking } = useStreamingAvatarContext();

  const {
    recordingState,
    startRecording,
    stopRecording,
    resetRecording,
    isRecording,
    hasError,
    isProcessing,
  } = useAudioRecording({
    onTranscriptionComplete: (text) => {
      // console.log("Transcription received:", text);
      setMessage(text);
    },
    onError: (error) => {
      toast(`Error: ${error}`);
      setMessage("");
    },
    transcriptionText: message,
    setTranscriptionText: setMessage,
  });

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (hasError) {
      resetRecording();
    } else {
      startRecording();
    }
  };

  const ButtonContent = () => {
    switch (recordingState) {
      case RecordingState.RECORDING:
        return (
          <>
            <MicOff className="h-4 w-4" />
            Stop Recording
          </>
        );
      case RecordingState.PROCESSING:
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        );
      case RecordingState.ERROR:
        return (
          <>
            <AlertCircle className="h-4 w-4" />
            Try Again
          </>
        );
      default:
        return (
          <>
            <Mic className="h-4 w-4" />
            Start Recording
          </>
        );
    }
  };

  const getButtonStyles = () => {
    if (hasError) return "bg-red-500 hover:bg-red-600 text-white";
    if (isRecording)
      return "bg-red-500 hover:bg-red-600 text-white animate-pulse";
    return "";
  };

  return (
    <Button
      id="recordButton"
      onClick={handleClick}
      disabled={disabled || (avatar ? isProcessing || isAvatarTalking : true)}
      className={`flex items-center gap-2 transition-all duration-200 ${getButtonStyles()}`}
    >
      {avatar ? <ButtonContent /> : <span>Avatar not ready</span>}
    </Button>
  );
};

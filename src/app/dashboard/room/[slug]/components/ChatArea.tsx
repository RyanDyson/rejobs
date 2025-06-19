"use client";

import { forwardRef } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTextChat } from "./AvatarLogic/useTextChat";
import { usePrevious } from "ahooks";
import { useConversationState } from "./AvatarLogic/useConversationState";
import { RecordingButton } from "./RecordingButton";
import type StreamingAvatar from "@heygen/streaming-avatar";
import { useState } from "react";
import { useAudioRecording, <RecordingS></RecordingS> } from "@/hooks/avatar-utils/use-audio-recording";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { type Dispatch, type SetStateAction } from "react";
import { RecognitionMode } from "./HeyGenControls";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Please enter a message",
  }),
});

type ChatAreaProps = {
  avatar?: StreamingAvatar | null;
  recognitionMode?: RecognitionMode;
  setRecognitionMode?: Dispatch<SetStateAction<RecognitionMode>>;
};

const ChatArea = forwardRef<HTMLDivElement, ChatAreaProps>(
  ({ avatar, recognitionMode }, ref) => {
    const { sendMessage } = useTextChat();
    const { startListening, stopListening } = useConversationState();
    const [message, setMessage] = useState<string>("");
    const { recordingState } = useAudioRecording({
      transcriptionText: message,
      language: "en-US",
      setTranscriptionText: setMessage,
    });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        message: "",
      },
    });

    const onsubmit = useCallback(
      (value: z.infer<typeof formSchema>) => {
        const { message } = value;

        if (message.trim() === "") {
          return;
        }
        sendMessage(message);
        setMessage("");
      },
      [sendMessage, setMessage]
    );

    const previousTranscript = usePrevious(message);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && message.trim()) {
          event.preventDefault();
          form.handleSubmit(onsubmit)();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [form, onsubmit, message]);

    useEffect(() => {
      if (!previousTranscript && message) {
        startListening();
      } else if (previousTranscript && !message) {
        stopListening();
      }
    }, [message, previousTranscript, startListening, stopListening]);

    return (
      <div ref={ref} className="flex flex-col gap-2 w-full">
        {recognitionMode === RecognitionMode.EDIT && (
          <RecordingButton
            avatar={avatar}
            message={message}
            setMessage={setMessage}
          />
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="flex gap-2 w-full relative"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="w-full py-2">
                        <FormLabel className="sr-only">
                          Transcribed Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={message}
                            onChange={(e) => {
                              field.onChange(e);
                              setMessage(e.target.value);
                            }}
                            disabled={
                              recognitionMode === RecognitionMode.EDIT &&
                              recordingState === RecordingState.IDLE
                            }
                            placeholder="Type your message here or speak to transcribe..."
                            className="resize-none h-10 w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="cursor-pointer h-8 w-8 rounded-full  absolute right-2 top-4"
                    disabled={!message.trim()}
                    type="submit"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </TooltipTrigger>
            {recognitionMode === RecognitionMode.EDIT && (
              <TooltipContent>
                Record first, then edit your transcription
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
);

ChatArea.displayName = "ChatArea";
export { ChatArea };

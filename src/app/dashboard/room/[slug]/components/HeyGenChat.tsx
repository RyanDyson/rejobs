"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { ChatBubble, type ChatMessage } from "./ChatBubble";
import { useMessageHistory } from "@/hooks/avatar-utils";

const messageInit = {
  id: "start",
  role: "SYSTEM" as const,
  text: "You can start chatting with the AI assistant now. Your message history will appear here.",
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export const HeyGenChat = ({ prompt }: { prompt: string }) => {
  const { messages: msgData } = useMessageHistory();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([messageInit]);
  const prevChatLengthRef = useRef<number>(1);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessages = msgData.map((msg) => ({
      id: msg.id,
      role: msg.sender as ChatMessage["role"],
      text: msg.content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    setChat([messageInit, ...initialMessages]);
  }, [msgData]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    if (chat.length > prevChatLengthRef.current) {
      setTimeout(scrollToBottom, 0);
    }
    prevChatLengthRef.current = chat.length;
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="relative bg-card rounded-xl shrink h-auto max-h-1/4 flex flex-col border border-accent">
      <div
        ref={chatContainerRef}
        className="flex flex-col gap-y-2 overflow-y-auto p-4 scroll-smooth h-full"
        onScroll={handleScroll}
      >
        {chat.map((message) => (
          <ChatBubble key={message.id} chat={message} prompt={prompt} />
        ))}
      </div>

      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            className="absolute bottom-4 right-4 z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
          >
            <Button
              onClick={scrollToBottom}
              className="h-10 w-10 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Scroll to latest messages"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type ChatMessage = {
  id: string;
  role: "CLIENT" | "AVATAR" | "SYSTEM";
  text: string;
  timestamp: string;
};

type ChatBubbleProps = {
  chat: ChatMessage;
  prompt: string;
};

export const ChatBubble = ({ chat, prompt }: ChatBubbleProps) => {
  const { id, role, text, timestamp } = chat;
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);

  // console.log(text, prompt);

  if (text === prompt) {
    return <></>;
  }

  // Check if this is a prompt message
  const isPromptMessage = text.startsWith('"PROMPT:');

  if (role === "SYSTEM" || isPromptMessage) {
    // For prompt messages, extract the content after "PROMPT:"
    const displayText = isPromptMessage ? text.substring(7).trim() : text;

    return (
      <div key={id} className="flex justify-center">
        <div className="px-3 py-2 rounded-md bg-neutral-50 dark:bg-neutral-800 max-w-[85%] w-full">
          {isPromptMessage ? (
            <div className="space-y-2">
              <button
                onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors w-full justify-center"
              >
                {isPromptExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                <span className="font-medium">System Prompt</span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  ({isPromptExpanded ? "Click to collapse" : "Click to expand"})
                </span>
              </button>

              {isPromptExpanded && (
                <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-600">
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 text-left">
                    {displayText}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              {text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      key={id}
      className={`flex flex-col ${
        role === "CLIENT" ? "items-end" : "items-start"
      }`}
    >
      <span className="font-medium text-sm text-neutral-500 dark:text-neutral-400">
        {role === "CLIENT" ? "You" : "AI Assistant"}
      </span>
      <div
        className={`mt-1 p-3 rounded-lg ${
          role === "CLIENT"
            ? "bg-primary-100 dark:bg-primary-900/30 dark:border dark:border-primary-700/50"
            : "bg-neutral-100 dark:bg-neutral-800 dark:border dark:border-neutral-700"
        }`}
      >
        <div className="text-sm text-neutral-800 dark:text-neutral-200">
          {text}
        </div>
      </div>
      <span className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
        {timestamp}
      </span>
    </div>
  );
};

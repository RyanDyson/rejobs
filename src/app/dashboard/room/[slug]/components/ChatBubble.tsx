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
        <div className="px-3 py-2 rounded-md bg-gray-50 max-w-[85%] w-full">
          {isPromptMessage ? (
            <div className="space-y-2">
              <button
                onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 transition-colors w-full justify-center"
              >
                {isPromptExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                <span className="font-medium">System Prompt</span>
                <span className="text-gray-400">
                  ({isPromptExpanded ? "Click to collapse" : "Click to expand"})
                </span>
              </button>

              {isPromptExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600 text-left">
                    {displayText}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center">{text}</div>
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
      <span className="font-medium text-sm text-gray-500">
        {role === "CLIENT" ? "You" : "AI Assistant"}
      </span>
      <div
        className={`mt-1 p-3 rounded-lg ${
          role === "CLIENT" ? "bg-pink-100" : "bg-gray-100"
        }`}
      >
        <div className="text-sm text-gray-800">{text}</div>
      </div>
      <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
    </div>
  );
};

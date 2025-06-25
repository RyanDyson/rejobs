"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useStreamingAvatarSession } from "@/hooks/avatar-utils";
import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";
import { DisplayText } from "@/components/global/display-text";

const CardItem = ({
  left,
  right,
}: {
  left: string | React.ReactNode;
  right: string | React.ReactNode;
}) => {
  return (
    <div className="text-muted-foreground flex justify-between items-center">
      <span className="font-semibold">{left}</span>
      <span className="text-right">{right}</span>
    </div>
  );
};

type details = { left: string; right: string | React.ReactNode }[];

export function RoomDetailSection({
  roomID,
  roomDetails,
  courseDetails,
}: {
  roomID: string;
  roomDetails: details;
  courseDetails: details;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { sessionState } = useStreamingAvatarSession();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [roomDetails, courseDetails]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (sessionState === StreamingAvatarSessionState.CONNECTED) {
      setIsExpanded(false);
    }
    if (sessionState === StreamingAvatarSessionState.INACTIVE) {
      setIsExpanded(true);
    }
  }, [sessionState]);

  return (
    <Card className="p-4 in-w-[200px] h-min transition-all duration-300 ease-in-out flex flex-col justify-between bg-gradient-to-b from-card to-primary/25 ">
      <CardHeader className="p-0 flex justify-between items-center">
        <CardTitle>
          <DisplayText className="max-w-full text-white flex-wrap text-3xl font-semibold tabular-nums @[250px]/card:text-3xl text-wrap wrap-anywhere">
            {roomID}
          </DisplayText>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleExpand}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </CardHeader>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out pb-0"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? "1rem" : "0",
        }}
      >
        <div ref={contentRef}>
          <CardContent className="h-full flex-col gap-y-2 text-sm divide-y divide-muted p-0">
            <div className="flex flex-col gap-y-2 pb-2">
              <DisplayText className="text-lg font-semibold">
                Room Details
              </DisplayText>
              {roomDetails.map((item, index) => (
                <CardItem key={index} left={item.left} right={item.right} />
              ))}
            </div>
            <div className="flex flex-col gap-y-2 pb-2 pt-2">
              <DisplayText className="text-lg font-semibold">
                Job Details
              </DisplayText>
              {courseDetails.map((item, index) => (
                <CardItem key={index} left={item.left} right={item.right} />
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

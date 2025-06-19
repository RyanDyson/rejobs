import { useEffect, useRef } from "react";
import { forwardRef } from "react";
import { useStreamingAvatarSession } from "@/hooks/avatar-utils";
import { StreamingAvatarSessionState } from "@/hooks/avatar-utils";
import { LoadingIcon } from "@/components/global/loading-icon";

const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState } = useStreamingAvatarSession();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  return (
    <>
      <video
        ref={ref}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        className="rounded-xl"
      >
        <track kind="captions" />
      </video>
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
          Loading...
        </div>
      )}
    </>
  );
});

AvatarVideo.displayName = "AvatarVideo";

const InteractiveAvatar = () => {
  const { sessionState, stream } = useStreamingAvatarSession();

  const mediaStreamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && mediaStreamRef.current) {
      mediaStreamRef.current.srcObject = stream;
      mediaStreamRef.current.onloadedmetadata = () => {
        mediaStreamRef.current!.play();
      };
    }
  }, [mediaStreamRef, stream]);

  return (
    <div className="aspect-video h-min bg-zinc-900 rounded-xl flex items-center justify-center max-h-3/4">
      {sessionState === StreamingAvatarSessionState.INACTIVE ? (
        <div className="text-white">
          To get started, click the start button.
        </div>
      ) : sessionState === StreamingAvatarSessionState.CONNECTING ? (
        <div>
          <LoadingIcon />
        </div>
      ) : (
        <AvatarVideo ref={mediaStreamRef} />
      )}
    </div>
  );
};

export const HeyGenVideo = () => {
  return <InteractiveAvatar />;
};

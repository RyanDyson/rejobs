import { useStreamingAvatarContext } from "./AvatarContextProvider";

export const useConnectionQuality = () => {
  const { connectionQuality } = useStreamingAvatarContext();

  return {
    connectionQuality,
  };
};

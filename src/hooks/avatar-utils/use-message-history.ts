import { useStreamingAvatarContext } from "./AvatarContextProvider";

export const useMessageHistory = () => {
  const { messages } = useStreamingAvatarContext();

  return { messages };
};

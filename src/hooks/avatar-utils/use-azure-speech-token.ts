import { useState, useCallback, useRef } from "react";

// interface TokenResponse {
//   token: string;
//   region: string;
//   expiryTime: number;
// }

export const useAzureSpeechToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokenExpiryRef = useRef<number>(0);

  const fetchToken = useCallback(async (): Promise<string | null> => {
    const now = Date.now();
    if (token && tokenExpiryRef.current > now) {
      return token;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "audio/wav",
        },
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          `HTTP ${response.status}: ${response.statusText} - ${errorData}`
        );
      }

      const tokenValue = await response.text();

      const expiryTime = now + 9 * 60 * 1000;
      tokenExpiryRef.current = expiryTime;

      setToken(tokenValue);
      return tokenValue;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch Azure Speech token";
      setError(errorMessage);
      console.error("Azure Speech token fetch error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearToken = useCallback(() => {
    setToken(null);
    setError(null);
    tokenExpiryRef.current = 0;
  }, []);

  return {
    token,
    loading,
    error,
    fetchToken,
    clearToken,
    isTokenValid: token && tokenExpiryRef.current > Date.now(),
  };
};

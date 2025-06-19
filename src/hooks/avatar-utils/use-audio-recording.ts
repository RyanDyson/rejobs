import { useState, useRef, useCallback } from "react";
import { useAzureSpeechToken } from "./use-azure-speech-token";
import { type Dispatch, type SetStateAction } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export enum RecordingState {
  IDLE = "idle",
  RECORDING = "recording",
  PROCESSING = "processing",
  ERROR = "error",
}

interface UseAzureSpeechRecordingProps {
  onTranscriptionComplete?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
  transcriptionText: string;
  setTranscriptionText: Dispatch<SetStateAction<string>>;
}

export const useAudioRecording = ({
  onTranscriptionComplete,
  onError,
  language = "en-US",
  transcriptionText,
  setTranscriptionText,
}: UseAzureSpeechRecordingProps) => {
  const [recordingState, setRecordingState] = useState<RecordingState>(
    RecordingState.IDLE
  );

  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognizerRef = useRef<sdk.SpeechRecognizer>(null);

  const { fetchToken, error: tokenError } = useAzureSpeechToken();

  const startRecording = useCallback(async () => {
    try {
      setRecordingState(RecordingState.RECORDING);
      setTranscriptionText("");

      const token = await fetchToken();
      if (!token) {
        throw new Error(tokenError || "Failed to obtain Azure Speech token");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      if (typeof window !== "undefined") {
        const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
          token,
          process.env.NEXT_PUBLIC_AZURE_REGION || "southeastasia"
        );
        speechConfig.speechRecognitionLanguage = language;

        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizerRef.current = recognizer;

        recognizer.recognizing = (s, e) => {
          setTranscriptionText(e.result.text);
        };

        recognizer.recognized = (s, e) => {
          if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
            const finalText = e.result.text;
            setTranscriptionText(finalText);
            onTranscriptionComplete?.(finalText);
          }
        };

        recognizer.canceled = (s, e) => {
          // console.log(s);
          console.error("Speech recognition canceled:", e.errorDetails);
          setRecordingState(RecordingState.ERROR);
          onError?.(`Recognition canceled: ${e.errorDetails}`);
        };

        recognizer.sessionStopped = () => {
          setRecordingState(RecordingState.IDLE);
        };

        recognizer.startContinuousRecognitionAsync(
          () => {
            // console.log("Continuous recognition started successfully");
          },
          (error) => {
            console.error("Error starting continuous recognition:", error);
            setRecordingState(RecordingState.ERROR);
            onError?.(`Failed to start recognition: ${error}`);
          }
        );
      }
    } catch (error) {
      console.error("Error starting Azure Speech recording:", error);
      setRecordingState(RecordingState.ERROR);
      onError?.(
        error instanceof Error ? error.message : "Failed to start recording"
      );
    }
  }, [
    fetchToken,
    tokenError,
    onTranscriptionComplete,
    onError,
    language,
    setTranscriptionText,
  ]);

  const stopRecording = useCallback(() => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          // console.log("Continuous recognition stopped successfully");
          recognizerRef.current?.close();
          recognizerRef.current = null;
        },
        (error: string) => {
          console.error("Error stopping recognition:" + error);
          recognizerRef.current?.close();
          recognizerRef.current = null;
        }
      );
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    setRecordingState(RecordingState.IDLE);
  }, []);

  const resetRecording = useCallback(() => {
    stopRecording();
    setTranscriptionText("");
    setRecordingState(RecordingState.IDLE);
  }, [stopRecording, setTranscriptionText]);

  return {
    recordingState,
    transcriptionText,
    startRecording,
    stopRecording,
    resetRecording,
    isRecording: recordingState === RecordingState.RECORDING,
    isProcessing: recordingState === RecordingState.PROCESSING,
    hasError: recordingState === RecordingState.ERROR,
  };
};

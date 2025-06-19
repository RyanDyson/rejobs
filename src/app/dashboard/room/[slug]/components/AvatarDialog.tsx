"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AVATARS } from "@/lib/heygen-constants";
import { StartAvatarRequest } from "@heygen/streaming-avatar";
import { Check, User } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";

type AvatarSelectionDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  avatarConfig: StartAvatarRequest;
  setAvatarConfig: (config: StartAvatarRequest) => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

export const AvatarDialog = ({
  open,
  onOpenChange,
  avatarConfig,
  setAvatarConfig,
  onConfirm,
  children,
}: AvatarSelectionDialogProps) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(
    avatarConfig?.voice?.voiceId || AVATARS[0]?.avatar_id || ""
  );

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatarId(avatarId);
    const selectedAvatar = AVATARS.find(
      (avatar) => avatar.avatar_id === avatarId
    );
    if (selectedAvatar) {
      setAvatarConfig({
        ...avatarConfig,
        avatarName: selectedAvatar.avatar_id,
        voice: {
          ...avatarConfig.voice,
        },
      });
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Choose Your AI Avatar
          </DialogTitle>
          <DialogDescription>
            Select an avatar to represent your AI tutor during the session. You
            can change this later in the settings.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
          {AVATARS.map((avatar) => {
            const isSelected = avatar.avatar_id === selectedAvatarId;
            return (
              <Card
                key={avatar.avatar_id}
                className={`cursor-pointer h-min transition-all duration-200 hover:shadow-md py-0 ${
                  isSelected
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleAvatarSelect(avatar.avatar_id)}
              >
                <CardContent className="p-4 h-min">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label className="font-medium text-base cursor-pointer">
                        {avatar.name}
                      </Label>
                    </div>
                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Avatar preview placeholder - you can add actual avatar images here */}
                  <Image
                    src={avatar.preview}
                    alt={avatar.name}
                    className="object-cover aspect-video mt-2 min-h-32 w-full h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedAvatarId}
            className="min-w-[120px]"
          >
            Start Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

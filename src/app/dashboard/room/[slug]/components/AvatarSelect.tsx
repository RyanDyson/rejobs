"use client";

import { StartAvatarRequest } from "@heygen/streaming-avatar";
import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { AVATARS } from "@/lib/heygen-constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

type AvatarSelectProps = {
  avatarConfig: StartAvatarRequest;
  setAvatarConfig: Dispatch<SetStateAction<StartAvatarRequest>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  restartSession?: () => void;
};

export const AvatarSelect = ({
  avatarConfig,
  setAvatarConfig,
  open,
  setOpen,
  restartSession,
}: AvatarSelectProps) => {
  const [pendingAvatarId, setPendingAvatarId] = useState<string | null>(null);

  const handleConfirmation = () => {
    if (pendingAvatarId) {
      const selectedAvatar = AVATARS.find(
        (avatar) => avatar.avatar_id === pendingAvatarId
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
    }
    setOpen(false);
    setPendingAvatarId(null);

    restartSession?.();
  };

  const handleCancel = () => {
    setOpen(false);
    setPendingAvatarId(null);
  };

  const handleValueChange = (value: string) => {
    if (value !== avatarConfig.avatarName) {
      setPendingAvatarId(value);
      setOpen(true);
    }
  };

  return (
    <>
      <Select
        value={avatarConfig.avatarName || ""}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full bg-neutral-100">
          <SelectValue>
            <span className="text-black">
              {AVATARS.find(
                (avatar) => avatar.avatar_id === avatarConfig.avatarName
              )?.name || ""}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {AVATARS.map((avatar) => {
              const isSelected = avatar.avatar_id === avatarConfig?.avatarName;
              return (
                <SelectItem
                  key={avatar.avatar_id}
                  value={avatar.avatar_id}
                  className={`flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-white data-[highlighted]:bg-primary data-[highlighted]:text-white"
                      : ""
                  }`}
                >
                  <span>{avatar.name}</span>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Confirm Avatar Change
            </DialogTitle>
            <DialogDescription className="text-primary">
              This will restart your current session and you may lose any
              ongoing conversation progress.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-4 ">
            <div className="text-sm text-muted-foreground">
              <strong>Current Avatar:</strong>{" "}
              {AVATARS.find(
                (avatar) => avatar.avatar_id === avatarConfig.avatarName
              )?.name || "None"}
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>New Avatar:</strong>{" "}
              {AVATARS.find((avatar) => avatar.avatar_id === pendingAvatarId)
                ?.name || "None"}
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirmation}>Change Avatar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AvatarQuality } from "@heygen/streaming-avatar";
import { useState } from "react";
import { Settings } from "lucide-react";

type QualitySelectProps = {
  avatarConfig: StartAvatarRequest;
  setAvatarConfig: Dispatch<SetStateAction<StartAvatarRequest>>;
};

// Define available quality options
const QUALITY_OPTIONS = [
  {
    value: AvatarQuality.Low,
    label: "Low Quality",
    description: "Faster, lower bandwidth",
  },
  {
    value: AvatarQuality.Medium,
    label: "Medium Quality",
    description: "Balanced quality and performance",
  },
  {
    value: AvatarQuality.High,
    label: "High Quality",
    description: "Best quality, higher bandwidth",
  },
];

export const QualitySelect = ({
  avatarConfig,
  setAvatarConfig,
}: QualitySelectProps) => {
  const [open, setOpen] = useState(false);
  const [pendingQuality, setPendingQuality] = useState<AvatarQuality | null>(
    null
  );

  const handleConfirmation = () => {
    if (pendingQuality) {
      setAvatarConfig({
        ...avatarConfig,
        quality: pendingQuality,
      });
    }
    setOpen(false);
    setPendingQuality(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setPendingQuality(null);
  };

  const handleValueChange = (value: string) => {
    const selectedQuality = value as AvatarQuality;
    // Check if user is trying to change to a different quality
    if (selectedQuality !== avatarConfig.quality) {
      setPendingQuality(selectedQuality);
      setOpen(true);
    }
  };
  return (
    <>
      <Select
        value={avatarConfig.quality || AvatarQuality.High}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full bg-neutral-100">
          <SelectValue>
            <span className="text-black">
              {QUALITY_OPTIONS.find((q) => q.value === avatarConfig.quality)
                ?.label || "High Quality"}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {QUALITY_OPTIONS.map((quality) => {
              const isSelected = quality.value === avatarConfig.quality;
              return (
                <SelectItem
                  key={quality.value}
                  value={quality.value}
                  className={`flex flex-col items-start justify-start p-2 ${
                    isSelected
                      ? "bg-primary text-white data-[highlighted]:bg-primary data-[highlighted]:text-white"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-1 w-full">
                    <span className="font-medium">{quality.label}</span>
                    <span className="text-xs opacity-75">
                      {quality.description}
                    </span>
                  </div>
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
              <Settings className="h-5 w-5 text-primary" />
              Confirm Quality Change
            </DialogTitle>
            <DialogDescription className="text-primary">
              {" "}
              This may affect your current session performance and could cause a
              brief interruption.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <div className="text-sm text-muted-foreground">
              <strong>Current Quality:</strong>{" "}
              {QUALITY_OPTIONS.find((q) => q.value === avatarConfig.quality)
                ?.label || "High Quality"}
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>New Quality:</strong>{" "}
              {QUALITY_OPTIONS.find((q) => q.value === pendingQuality)?.label ||
                "Unknown"}
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirmation}>Change Quality</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

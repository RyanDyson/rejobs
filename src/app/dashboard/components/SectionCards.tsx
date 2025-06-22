"use client";

import { useState } from "react";
import { RoomCard } from "./RoomCard";
import { CreateRoomDialog } from "./CreateRoomDialog";
import { EmptyRoomsState } from "./EmptyRoomState";
import { type room } from "@/server/db/schema";
import Link from "next/link";

type SectionCardsProps = {
  data: room[];
  onCreateRoom?: (data: {
    name: string;
    description: string;
    jobType: "Full-time" | "Part-time" | "Internship" | "Placement";
    company: string;
    position: string;
  }) => Promise<void>;
};

export function SectionCards({ data, onCreateRoom }: SectionCardsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateRoom = async (roomData: {
    name: string;
    description: string;
    jobType: "Full-time" | "Part-time" | "Internship" | "Placement";
    company: string;
    position: string;
  }) => {
    if (onCreateRoom) {
      await onCreateRoom(roomData);
    }
  };

  // Show empty state if no rooms
  if (data.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <EmptyRoomsState setShowDialog={setShowCreateDialog} />
        <CreateRoomDialog onCreateRoom={handleCreateRoom} />
      </div>
    );
  }

  // Show rooms grid with create button
  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Practice Rooms</h2>
          <p className="text-muted-foreground">
            Continue practicing or create a new interview session
          </p>
        </div>
        {onCreateRoom && <CreateRoomDialog onCreateRoom={handleCreateRoom} />}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <Link href={`/room/${item.id}`} key={index} className="w-full">
            <RoomCard data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

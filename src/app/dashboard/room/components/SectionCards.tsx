"use client";

import { RoomCard } from "./RoomCard";
import { CreateRoomDialog } from "./CreateRoomDialog";
import { EmptyRoomsState } from "./EmptyRoomState";
import { type room } from "@/server/db/schema";
import Link from "next/link";

type SectionCardsProps = {
  data: room[];
};

export function SectionCards({ data }: SectionCardsProps) {
  // Show empty state if no rooms
  if (data.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <EmptyRoomsState />
        <CreateRoomDialog />
      </div>
    );
  }

  // Show rooms grid with create button
  return (
    <div className="relative h-full w-full">
      <CreateRoomDialog
        triggerClassName={"rounded-full p-4 absolute bottom-0 right-0"}
        isMinimal
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <Link href={`./room/${item.id}`} key={index} className="w-full">
            <RoomCard data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

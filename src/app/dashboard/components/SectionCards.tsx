"use client";

import { RoomCard } from "./RoomCard";
import { type room } from "@/server/db/schema";
import Link from "next/link";

type SectionCardsProps = {
  data: room[];
};

export function SectionCards({ data }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full overflow-hidden w-full">
      {data.map((item, index) => {
        return (
          <Link href={`/room/${item.id}`} key={index} className="w-full h-full">
            <RoomCard data={item} />
          </Link>
        );
      })}
    </div>
  );
}

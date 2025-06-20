import { SectionCards } from "./components/SectionCards";
import { type room } from "@/server/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { client } from "@/lib/client";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full overflow-hidden w-full">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
};

// Component to fetch and display room data
async function RoomData() {
  const data: room[] = [];

  try {
    const temp = await client.user.getUser.$get();
    const user = await temp.json();
    if (!user || !user[0]?.id) {
      console.log("User not found or user ID is missing");
    }
    const res = await client.room.getAllByUserId.$get({
      userId: user[0]?.id || 0,
    });
    const rooms = await res.json();
    console.log(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return (
      <div>
        Error fetching rooms. Make sure you are connected to CityU&apos;s
        network.
      </div>
    );
  }

  return <SectionCards data={data} />;
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6 px-4 h-full">
      {/* <SectionSearchBar
        value={""}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      /> */}

      <Suspense fallback={<LoadingSkeleton />}>
        <RoomData />
      </Suspense>

      {/* <SectionPagination
        currentPage={0}
        totalPages={0}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
    </div>
  );
}

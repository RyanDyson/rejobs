import { SectionCards } from "./components/SectionCards";
// import { SectionSearchBar } from "./components/SectionSearchBar";
// import { SectionPagination } from "./components/SectionPagination";
import { type room } from "@/server/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/client";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden w-full">
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
  const clerkUser = await currentUser();
  let rooms: room[] = [];

  try {
    const temp = await client.user.getDbUser.$get({
      clerkId: clerkUser?.id || "",
    });
    const user = await temp.json();
    const res = await client.room.getAllByUserId.$get({
      userId: user?.id || 0,
    });
    rooms = await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return (
      <div>
        Error fetching rooms. Make sure you are connected to CityU&apos;s
        network.
      </div>
    );
  }

  return <SectionCards data={rooms} />;
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6 px-4 h-full">
      <Suspense fallback={<LoadingSkeleton />}>
        {/* <SectionSearchBar value={""} onChange={() => {}} /> */}
        <RoomData />
        {/* <SectionPagination
          currentPage={0}
          totalPages={0}
          onPageChange={() => {}}
        /> */}
      </Suspense>
    </div>
  );
}

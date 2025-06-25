import { formatDate } from "@/lib/format-helper";
import { type room } from "@/server/db/schema";
import { ClientPage } from "./ClientPage";
import { Suspense } from "react";
import { LoadingIcon } from "@/components/global/loading-icon";

const LoadingSkeleton = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingIcon />
    </div>
  );
};

// Component to fetch and display room data
async function RoomData({}: { roomID: string }) {
  const data: room = {} as room;
  try {
    // const auth = "Bearer " + (process.env.CITYU_AUTHORIZATION ?? "");
    // const res = await fetch(
    //   `https://vbcms.its.cityu.edu.hk/api/rooms/${roomID}?populate=*`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: auth,
    //     },
    //   }
    // );
    // if (!res.ok) {
    //   throw new Error("Failed to fetch room data");
    // }
    // const responseData = (await res.json()) as apiResponse;
    // data = responseData.data;
  } catch (error) {
    console.error("Error fetching room data:", error);
    return (
      <div className="@container/main h-full flex items-center justify-center py-4 md:py-6 px-4">
        <span>
          Error fetching room data. Make sure you are connected to CityU
          network.
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="@container/main h-full flex items-center justify-center py-4 md:py-6 px-4">
        <span className="text-muted-foreground">No room data available.</span>
      </div>
    );
  }

  const formattedUpdatedAt = formatDate(data.updatedAt);
  const formattedCreatedAt = formatDate(data.createdAt);

  const roomDetails = [
    { left: "Created At", right: formattedCreatedAt.toDateString() },
    { left: "Updated At", right: formattedUpdatedAt.toDateString() },
  ];
  const courseDetails = [
    { left: "Room ID", right: data.id },
    { left: "Room Name", right: data.name },
    { left: "Description", right: data.description },
  ];

  return (
    <ClientPage
      roomDetails={roomDetails}
      courseDetails={courseDetails}
      roomID={`${data.id}`}
      apiRes={data}
    />
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <RoomDataWrapper params={params} />
    </Suspense>
  );
}

// Wrapper component to handle async params
async function RoomDataWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const roomID = (await params).slug;
  return <RoomData roomID={roomID} />;
}

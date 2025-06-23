import { type room } from "@/server/db/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format-helper";

type RoomCardProps = {
  data: room;
};

export const RoomCard = ({ data }: RoomCardProps) => {
  const formattedUpdatedAt = formatDate(data.updatedAt);

  return (
    <Card className="@container/card ring-0  w-full h-full flex flex-col justify-between hover:to-emerald-300 transition-colors cursor-pointer bg-gradient-to-b from-white to-emerald-100 hover:border-primary">
      <CardHeader className="max-w-full flex-wrap flex flex-col gap-y-0.5">
        <div className="flex w-full items-start justify-between gap-x-1">
          <CardDescription className="text-muted-foreground text-nowrap w-full overflow-hidden">
            {data.id}
          </CardDescription>
        </div>
        <CardTitle className="pt-2 wrap-anywhere text-pretty text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {data.name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          Last updated at {formattedUpdatedAt.toDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

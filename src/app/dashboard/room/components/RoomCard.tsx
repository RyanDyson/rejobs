import { type room } from "@/server/db/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format-helper";
import { DisplayText } from "@/components/global/display-text";

type RoomCardProps = {
  data: room;
};

export const RoomCard = ({ data }: RoomCardProps) => {
  const formattedUpdatedAt = formatDate(data.updatedAt);
  console.log("RoomCard data:", data);

  return (
    <Card className="@container/card ring-0 w-full h-full flex flex-col justify-between hover:to-primary/50 transition-colors cursor-pointer bg-gradient-to-b from-background to-primary/25 hover:border-primary">
      <CardHeader className="max-w-full flex-wrap flex flex-col gap-y-0.5">
        <CardTitle>
          <DisplayText className="pt-2 wrap-anywhere text-pretty text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.name}
          </DisplayText>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-nowrap w-full overflow-hidden">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          Last updated at {formattedUpdatedAt.toDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

import { Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const ist = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export function DisplayText({
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={cn(ist.className, props.className)}>
      {props.children}
    </span>
  );
}

"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { PropsWithChildren, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <TooltipProvider>{children}</TooltipProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

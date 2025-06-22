"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreateUserOnSignUp } from "@/hooks/user-create-user-on-signup";
import { LoadingIcon } from "@/components/global/loading-icon";
import { DisplayText } from "@/components/global/display-text";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { isCreating, error } = useCreateUserOnSignUp();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-950">
        <div className="flex flex-col items-center space-y-4">
          <LoadingIcon />
          <DisplayText className="text-2xl text-stone-50">
            Completing your sign up...
          </DisplayText>
        </div>
      </div>
    );
  }

  // Show loading while creating user
  if (isCreating) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-950">
        <div className="flex flex-col items-center space-y-4">
          <LoadingIcon />
          <DisplayText className="text-2xl text-stone-50">
            Setting up your account...
          </DisplayText>
          <p className="text-stone-400">
            Please wait while we prepare your dashboard
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-950">
        <div className="flex flex-col items-center space-y-4">
          <DisplayText className="text-2xl text-red-400">
            Something went wrong
          </DisplayText>
          <p className="text-stone-400">Redirecting you to the dashboard...</p>
        </div>
      </div>
    );
  }

  // This shouldn't be reached as the hook handles redirects
  return null;
}

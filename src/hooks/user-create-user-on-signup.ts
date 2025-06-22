import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";

export function useCreateUserOnSignUp() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const hasCreatedUser = useRef(false);

  const createUserMutation = useMutation({
    mutationFn: async () => {
      const res = await client.user.newUser.$post();
      return await res.json();
    },
    onSuccess: (data) => {
      console.log("User created successfully in database:", data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      router.push("/dashboard");
    },
  });

  useEffect(() => {
    if (
      isLoaded &&
      user &&
      !hasCreatedUser.current &&
      !createUserMutation.isPending
    ) {
      hasCreatedUser.current = true;
      createUserMutation.mutate();
    }
  }, [isLoaded, user, createUserMutation]);

  return {
    isCreating: createUserMutation.isPending,
    error: createUserMutation.error,
  };
}

"use client";

import { DisplayText } from "@/components/global/display-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function Page() {
  return (
    <SignIn.Root>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-950">
        <SignIn.Step name="start">
          <div className="flex min-w-96 flex-col justify-between space-y-1 rounded-md border-stone-700 bg-stone-950/50 text-stone-50 backdrop-blur-lg">
            <div>
              <div>
                <DisplayText className="text-3xl">
                  Sign in to your account.
                </DisplayText>
              </div>
            </div>

            <div className="flex w-full flex-col space-y-4 pb-2 pt-4">
              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center space-x-2 rounded-full border border-stone-700 bg-stone-900 py-2 transition-colors hover:bg-stone-950 hover:stroke-neutral-300"
              >
                <IconBrandGoogle className="h-5 w-5" />
                <p>Sign In with google</p>
              </Clerk.Connection>
              <div className="flex w-full items-center justify-between space-x-2">
                <p>Dont have an account?</p>
                <Link href={"/sign-up"}>
                  <Button className="rounded-full px-4 py-2 font-bold cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
              <div className="flex w-full items-center justify-end space-x-2 text-sm text-stone-300">
                <span>Secured by Clerk</span>
              </div>
            </div>
          </div>
        </SignIn.Step>

        <SignIn.Step name={"forgot-password"}>
          <div className="flex min-w-96 flex-col justify-between space-y-1 divide-y-2 divide-stone-700 rounded-md border-stone-700 bg-stone-950/50 text-stone-50 backdrop-blur-lg">
            <DisplayText className="text-3xl">
              Forgot your password?
            </DisplayText>

            <SignIn.SupportedStrategy name="reset_password_email_code">
              <Button>Reset Password</Button>
            </SignIn.SupportedStrategy>

            <SignIn.Action navigate="previous">Cancel</SignIn.Action>
          </div>
        </SignIn.Step>

        <SignIn.Step name="reset-password">
          <div className="flex min-w-96 flex-col justify-between space-y-1 divide-y-2 divide-stone-700 rounded-md border-stone-700 bg-stone-950/50 text-stone-50 backdrop-blur-lg">
            <DisplayText className="text-3xl">Reset your password</DisplayText>

            <SignIn.SupportedStrategy name="reset_password_email_code">
              <Button>Reset Password</Button>
            </SignIn.SupportedStrategy>

            <SignIn.Action navigate="previous">Cancel</SignIn.Action>
          </div>
        </SignIn.Step>
      </div>
    </SignIn.Root>
  );
}

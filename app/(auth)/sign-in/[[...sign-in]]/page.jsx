"use client";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen cursor-pointer items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            card: "shadow-xl rounded-lg border border-purple-500",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;

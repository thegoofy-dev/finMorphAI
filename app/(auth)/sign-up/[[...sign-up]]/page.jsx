"use client";

import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen cursor-pointer items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
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

export default SignUpPage;

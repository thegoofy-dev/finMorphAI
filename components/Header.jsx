import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;

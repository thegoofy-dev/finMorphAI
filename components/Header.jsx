import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container w-full mx-auto py-4 flex items-center justify-between">
        {/* For FinMorph Logo  */}
        <Link href="/">
          <Image
            height={40}
            width={40}
            className="object-contain rounded-full p-1 bg-purple-300"
            src="/animation.gif"
            alt="Animated Icon"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-pruple-600 flex items-center gap-2"
            >
              <Button
                variant={"outline"}
                className={
                  "border-2 hover:text-purple-700 border-purple-700 text-purple-700"
                }
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
              <Button
                className={
                  "bg-purple-700 hover:bg-purple-500 flex items-center gap-2"
                }
              >
                <Image
                  height={30}
                  width={30}
                  src="/sparkle.gif"
                  alt="Animated Icon"
                />
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <div className="flex gap-3">
              <SignInButton forceRedirectUrl="/dashboard">
                <Button
                  variant={"outline"}
                  className={"border-2 border-purple-700 text-purple-700"}
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/dashboard">
                <Button
                  className={
                    "bg-purple-700 hover:bg-purple-500 flex items-center gap-2"
                  }
                >
                  SignUp
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "cl-avatarBox",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;

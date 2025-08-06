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
    <div className="fixed top-0 z-50 w-full rounded-br-full rounded-bl-full border-4 border-t-0 border-purple-600 bg-purple-200/80 backdrop-blur-md">
      <nav className="lg container mx-auto flex w-full items-center justify-between px-8 py-4 max-sm:px-10">
        {/* For FinMorph Logo  */}
        <div className="max-sm:pl-1" >
        <Link href="/">
          <Image
            height={40}
            width={40}
            className="cursor-pointer rounded-full bg-purple-600 object-contain p-1"
            src="/animation.gif"
            alt="Animated Icon"
            unoptimized
          />
          </Link>
        </div>
          

        <div className="flex cursor-pointer pr-1 items-center space-x-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="hover:text-pruple-600 flex items-center gap-2 text-gray-600"
            >
              <Button
                variant={"outline"}
                className={
                  "cursor-pointer border-2 border-purple-700 text-purple-700 hover:text-purple-700"
                }
              >
                <LayoutDashboard className="cursor-pointer" size={18} />
                <span className="hidden cursor-pointer md:inline">
                  Dashboard
                </span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
              <Button
                className={
                  "flex cursor-pointer items-center gap-2 bg-purple-700 hover:bg-purple-500"
                }
              >
                <Image
                  unoptimized
                  height={30}
                  width={30}
                  className="cursor-pointer"
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
                  className={
                    "cursor-pointer border-2 border-purple-700 text-purple-700"
                  }
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/dashboard">
                <Button
                  className={
                    "flex cursor-pointer items-center gap-2 bg-purple-700 hover:bg-purple-500"
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

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import { Tent } from "lucide-react";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 z-50 w-full rounded-br-full rounded-bl-full border-4 border-t-0 border-purple-600 bg-purple-200/80 backdrop-blur-md">
      <nav className="max-w-8xl mx-auto flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:max-w-[91rem]">
        {/* For FinMorph Logo  */}
        <div className="mr-4 flex items-start pl-1 lg:pl-0">
          <Link href="/">
            <Image
              height={40}
              width={40}
              className="cursor-pointer rounded-full border-1 border-purple-600 bg-zinc-900 object-contain p-1"
              src="/animation.gif"
              alt="Animated Icon"
              unoptimized
            />
          </Link>
        </div>

        <div className="flex cursor-pointer items-center space-x-4">
          <SignedIn>
            <Link href={"/"} className="flex cursor-pointer items-center gap-2">
              <Button
                variant="ghost"
                className="group cursor-pointer border-2 border-purple-600 bg-zinc-950 p-2 hover:border-black hover:bg-transparent"
              >
                <Tent
                  className="cursor-pointer text-purple-600 transition-colors duration-200 group-hover:text-black"
                  size={20}
                />
                <span className="hidden cursor-pointer text-purple-600 transition-colors duration-200 group-hover:text-black md:inline">
                  Home
                </span>
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <div className="flex items-center justify-center rounded-full border-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "cl-avatarBox",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;

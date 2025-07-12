import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* For FinMorph Logo  */}
        {/* <Link href="/">
          <Image
            src={"/logo.png"}
            alt="FinMorph logo"
            height={60}
            width={200}
            className="h-12 w-auto object-contain"
          />
        </Link> */}
        <Button className={"bg-amber-500"}>
          <Link href={"/"}>LOGO</Link>
        </Button>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-pruple-600 flex items-center gap-2"
            >
              <Button variant={"outline"} className={"border-2 border-purple-700 text-purple-700"}>
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
              <Button className={"bg-purple-700 hover:bg-purple-500 flex items-center gap-2"}>
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <div className="flex gap-3">
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant={"outline"} className={"border-2 border-purple-700 text-purple-700"}>Login</Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/dashboard">
                <Button className={"bg-purple-700 hover:bg-purple-500 flex items-center gap-2"}>SignUp</Button>
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

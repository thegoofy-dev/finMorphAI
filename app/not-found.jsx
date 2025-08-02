import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist ot has been
        moved.
      </p>
      <Link href="/">
        <Button className="bg-purple-700 hover:bg-purple-500">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

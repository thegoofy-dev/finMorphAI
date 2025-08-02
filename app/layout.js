import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "FinMorph",
  description: "AI FInanced Platform",
  icons: {
    icon: "/finMorphLogo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* header */}
          <Header />

          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* footer */}
          <footer className="bg-purple-200 py-4">
            <div className="container mx-auto px-4 text-center text-2xl text-purple-700">
              <p>Made by GoofyGuy</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

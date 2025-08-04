import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

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
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* header */}
            <Header />

            <main className="min-h-screen">{children}</main>
            <Toaster richColors />


            {/* footer section*/}
            <footer className="roounded-tl-full rounded-tl-full rounded-tr-full border-4 border-b-0 border-purple-600 py-4">
              <div className="container mx-auto px-4 text-center text-2xl text-purple-700">
                <p>Made by </p>
                <div className="flex h-[4rem] items-center justify-center">
                  <TextHoverEffect text="GoofyGuy" />
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

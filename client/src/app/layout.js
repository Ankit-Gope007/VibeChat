import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import Providers from "@/component/Provider.js"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VibeChat",
  description: "Chat with people who match your Vibe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <main>
            {children}
            <Toaster closeButton />
          </main>
      </body>
    </html>
  );
}

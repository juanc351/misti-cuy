import { Geist, Geist_Mono } from "next/font/google";

import { NavigationProvider } from "@/components/navigation/NavigationProvider";
import { metadataConfig } from "@/config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = metadataConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { TestFlightBanner } from "@/components/banners/TestFlightBanner";
import { SITE_CONFIG } from "@/common/settings";

const allianceFont = localFont({
  src: "./../common/fonts/alliance-no-2-regular.otf",
  variable: "--font-alliance",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s - ${SITE_CONFIG.NAME}`,
  },
  description: SITE_CONFIG.DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    images: [
      {
        url: "/open-graph.jpg",
        width: 1200,
        height: 630,
      },
      // optimized image for whatsapp
      {
        url: "/open-graph.jpg",
        width: 400,
        height: 400,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${allianceFont.className} ${allianceFont.variable}`}>
        <AppHeader />
        <TestFlightBanner />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}

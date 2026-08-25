import type { Metadata } from "next";
import { DM_Sans, Sora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Md. Harun Or Rashid (Shoron) | Backend Software Engineer",
  description:
    "Portfolio of Md. Harun Or Rashid (Shoron) — Backend Software Engineer at Appinion BD specializing in scalable architectures, Laravel, PHP, MySQL, REST APIs, and applied AI/ML systems.",
  keywords: [
    "Shoron",
    "Md. Harun Or Rashid",
    "Software Engineer",
    "Backend Developer",
    "Appinion BD",
    "Laravel Developer",
    "PHP",
    "MySQL",
    "REST API",
    "Fintech",
    "North South University",
    "AI",
    "Machine Learning",
  ],
  authors: [{ name: "Md. Harun Or Rashid (Shoron)" }],
  creator: "Md. Harun Or Rashid (Shoron)",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Md. Harun Or Rashid (Shoron) | Backend Software Engineer",
    description:
      "Backend Software Engineer at Appinion BD building scalable enterprise architectures, fintech platforms, and intelligent software systems.",
    siteName: "Shoron Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Harun Or Rashid (Shoron) | Backend Software Engineer",
    description:
      "Backend Software Engineer at Appinion BD building scalable enterprise architectures, fintech platforms, and intelligent software systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${sora.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased noise ambient-bg">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

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
  title: "Shoron | Software Engineer",
  description:
    "Portfolio of Shoron — Software Engineer specializing in backend development, AI/ML, and full-stack solutions.",
  keywords: [
    "software engineer",
    "portfolio",
    "web developer",
    "backend developer",
    "Laravel",
    "Python",
    "AI",
    "machine learning",
  ],
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

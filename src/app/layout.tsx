import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harun Or Rashid | Software Engineer",
  description:
    "Portfolio of Md. Harun Or Rashid — Software Engineer specializing in backend development, AI/ML, and full-stack solutions.",
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased noise grid-bg">{children}</body>
    </html>
  );
}

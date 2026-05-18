import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adi Wahyudi — Fullstack Developer",
  description:
    "Fullstack Developer specializing in React.js, Next.js, TypeScript, and modern web technologies. Building scalable web applications with Next.js and MongoDB/Firebase.",
  keywords: [
    "fullstack developer",
    "frontend developer",
    "web developer",
    "next.js",
    "react",
    "typescript",
    "portfolio",
    "adi wahyudi",
  ],
  authors: [{ name: "Adi Wahyudi" }],
  openGraph: {
    title: "Adi Wahyudi — Fullstack Developer",
    description:
      "Fullstack Developer specializing in React.js, Next.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-background text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}

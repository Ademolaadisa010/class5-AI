import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Class5 AI — Study Smarter, Achieve More",
  description:
    "Class5 AI is the AI-powered academic ecosystem for students of all levels. Summarize PDFs, get instant explanations, generate quizzes, join study groups, and book tutors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body
        className="antialiased overflow-x-hidden bg-[#0F172A] text-[#F8FAFC]"
        style={{ fontFamily: "var(--font-dm), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
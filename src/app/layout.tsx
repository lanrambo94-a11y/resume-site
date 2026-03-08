import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人简历 | Portfolio",
  description: "A modern resume website built with Next.js and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
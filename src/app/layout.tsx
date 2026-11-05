import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimePrompt - 动漫AI提示词生成器",
  description: "可视化生成动漫风格AI绘图Prompt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-slate-900 min-h-screen`}
      >
        <NavBar />
        <main className="max-w-6xl mx-auto p-4 md:p-6">{children}</main>
        {/* 全局Toast */}
        <Toast />
      </body>
    </html>
  );
}

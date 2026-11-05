"use client";
import Link from "next/link";
import { usePromptStore } from "@/store/promptStore";

export default function NavBar() {
  const { isDark, toggleTheme, fillMockData } = usePromptStore();

  return (
    <nav className="sticky top-0 z-40 border-b px-4 py-4 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AnimePrompt
        </Link>
        <div className="flex gap-4 md:gap-6 items-center">
          <Link href="/" className="hover:text-blue-500">
            生成器
          </Link>
          <Link href="/history" className="hover:text-blue-500">
            历史记录
          </Link>
          <Link href="/template" className="hover:text-blue-500">
            模板
          </Link>

          {/* 开发用Mock按钮，上线务必删除 */}
          <button
            onClick={fillMockData}
            className="px-2 py-1.5 rounded-lg border border-orange-400 text-orange-500 text-sm hover:bg-orange-50 dark:hover:bg-orange-900/30"
          >
            填充Mock
          </button>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-lg border dark:border-slate-600"
          >
            {isDark ? "☀️ 浅色" : "🌙 深色"}
          </button>
        </div>
      </div>
    </nav>
  );
}

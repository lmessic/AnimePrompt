"use client";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { label: "Prompt生成器", href: "/" },
    { label: "历史记录", href: "/history" },
    { label: "我的模板", href: "/template" },
  ];

  return (
    <html lang="zh-CN" className={dark ? "dark" : ""}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">AnimePrompt</h1>
            <nav className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button onClick={toggleTheme} className="p-2">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

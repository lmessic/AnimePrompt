"use client";
import { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";

export default function Toast() {
  const { message, show, hideToast } = useToastStore();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [show, hideToast]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] bg-slate-800 text-white px-5 py-3 rounded-lg shadow-xl">
      {message}
    </div>
  );
}

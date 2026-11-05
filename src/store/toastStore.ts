"use client";
import { create } from "zustand";

interface ToastState {
  message: string;
  show: boolean;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  show: false,
  showToast: (msg: string) => {
    set({ message: msg, show: true });
  },
  hideToast: () => {
    set({ show: false, message: "" });
  },
}));

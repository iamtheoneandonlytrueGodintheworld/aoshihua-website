import { create } from "zustand";

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  hasWelcomed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  addMessage: (message: ChatMessage) => void;
  setWelcomed: (value: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],
  hasWelcomed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setWelcomed: (value) => set({ hasWelcomed: value }),
}));

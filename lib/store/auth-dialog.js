import { create } from "zustand";

export const useAuthDialogStore = create((set) => ({
  open: false,
  mode: "signup",
  openSignUp: () => set({ open: true, mode: "signup" }),
  openSignIn: () => set({ open: true, mode: "signin" }),
  setOpen: (open) => set({ open }),
  setMode: (mode) => set({ mode }),
}));

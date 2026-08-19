import { create } from "zustand";

export const useAuthDialogStore = create((set) => ({
  open: false,
  mode: "signup",
  step: "role",
  role: null,

  openSignUp: () =>
    set({ open: true, mode: "signup", step: "role", role: null }),

  openSignIn: () =>
    set({ open: true, mode: "signin", step: "role", role: null }),

  setOpen: (open) => set(open ? { open } : { open, step: "role", role: null }),

  setMode: (mode) => set({ mode }),
  selectRole: (role) => set({ role, step: "form" }),
  backToRole: () => set({ step: "role", role: null }),
}));

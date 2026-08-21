import { create } from "zustand";

export const useAuthDialogStore = create((set) => ({
  open: false,
  mode: "signup",
  step: "role",
  role: null,

  openSignUp: () =>
    set({ open: true, mode: "signup", step: "role", role: null }),

  openSignIn: () =>
    set({ open: true, mode: "signin", step: "form", role: null }),

  setOpen: (open) => set(open ? { open } : { open, step: "role", role: null }),

  setMode: (mode) => set({ mode }),
  selectRole: (role) =>
    set({ role, step: role === "artisan" ? "niveau" : "form" }),
  selectNiveau: () => set({ step: "form" }),
  goToDocuments: () => set({ step: "documents" }),
  back: () =>
    set((state) => {
      if (state.step === "documents") return { step: "form" };
      if (state.step === "form") {
        return state.role === "artisan"
          ? { step: "niveau" }
          : { step: "role", role: null };
      }
      return { step: "role", role: null };
    }),
  resetToRole: () => set({ step: "role", role: null }),
}));

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuthStore } from "@/lib/store/auth";

const emptySubscribe = () => () => {};

export default function DashboardLayout({ children }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  // token is only trustworthy once React has moved past the hydration
  // render (which must match the server and reads the pre-hydration
  // snapshot). This flips to true on the same render pass zustand's
  // useSyncExternalStore starts returning the real, rehydrated token.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/");
    }
  }, [mounted, token, router]);

  if (!mounted || !token) {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fafbfc]">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

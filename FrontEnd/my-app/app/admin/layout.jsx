"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { useUser } from "@/hooks/use-user";
import { useAuthStore } from "@/lib/store/auth";

const emptySubscribe = () => () => {};

export default function AdminLayout({ children }) {
  const token = useAuthStore((state) => state.token);
  const { data: user } = useUser();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/");
    } else if (mounted && user && user.role !== "admin") {
      router.replace("/");
    }
  }, [mounted, token, user, router]);

  if (!mounted || !token || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fafbfc]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

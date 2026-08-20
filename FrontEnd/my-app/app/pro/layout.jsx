"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ProSidebar } from "@/components/layout/pro-sidebar";
import { useUser } from "@/hooks/use-user";
import { useAuthStore } from "@/lib/store/auth";

const emptySubscribe = () => () => {};

export default function ProLayout({ children }) {
  const token = useAuthStore((state) => state.token);
  const { data: user, isPending } = useUser();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/");
    } else if (user && user.role !== "artisan") {
      router.replace("/dashboard");
    }
  }, [mounted, token, user, router]);

  if (!mounted || !token || isPending || user?.role !== "artisan") {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fafbfc]">
      <ProSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

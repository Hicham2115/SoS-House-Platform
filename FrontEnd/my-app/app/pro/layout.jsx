"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Clock, LogOut, ShieldAlert } from "lucide-react";
import { ProSidebar } from "@/components/layout/pro-sidebar";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";
import { useAuthStore } from "@/lib/store/auth";

const emptySubscribe = () => () => {};

// Niveaux that require an admin to review documents before the account can operate.
const VERIFIABLE_NIVEAUX = ["n1", "n2"];

function VerificationGateOverlay({ status, reason }) {
  const logout = useLogout();
  const rejected = status === "rejected";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
      <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl bg-white p-7 text-center shadow-[0_30px_80px_rgba(12,55,55,0.25)]">
        <span
          className={`flex size-14 items-center justify-center rounded-full ${
            rejected ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-500"
          }`}
        >
          {rejected ? (
            <ShieldAlert className="size-7" strokeWidth={1.8} />
          ) : (
            <Clock className="size-7" strokeWidth={1.8} />
          )}
        </span>
        <div>
          <p className="text-[17px] font-bold text-slate-950">
            {rejected ? "Vérification refusée" : "Vérification en cours"}
          </p>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-slate-600">
            {rejected
              ? (reason ??
                "Votre dossier n'a pas été validé. Contactez le support pour plus d'informations.")
              : "Un administrateur doit valider vos documents avant que vous puissiez accéder à votre espace pro."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => logout.mutate()}
          className="mt-1 flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <LogOut className="size-3.5" strokeWidth={2} />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

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

  const needsVerification =
    VERIFIABLE_NIVEAUX.includes(user.niveau) &&
    user.verification_status !== "approved";

  return (
    <div className="dashboard-shell flex h-screen w-full overflow-hidden bg-[#fafbfc]">
      <ProSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      {needsVerification && (
        <VerificationGateOverlay
          status={user.verification_status}
          reason={user.verification_rejection_reason}
        />
      )}
    </div>
  );
}

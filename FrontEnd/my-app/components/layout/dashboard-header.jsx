"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/auth";

export function DashboardHeader({ title, subtitle }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const displayName = user?.name ?? "Mon compte";
  const initials = user?.name?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div>
        <h1 className="text-xl font-bold text-slate-950">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-[13px] text-slate-600">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="size-5" strokeWidth={1.8} />
          <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[#ffa514] text-[10px] font-bold text-slate-950">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 outline-none hover:bg-slate-50">
            <Avatar>
              <AvatarImage src={avatar1.src} alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="text-[14px] font-semibold text-slate-800">
              {displayName}
            </span>
            <ChevronDown className="size-4 text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem
              render={<Link href="/dashboard/profil" />}
              className="gap-2.5 py-2"
            >
              <User className="size-4 text-slate-500" />
              Mon profil
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href="/dashboard/parametres" />}
              className="gap-2.5 py-2"
            >
              <Settings className="size-4 text-slate-500" />
              Paramètres du compte
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2.5 py-2"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut className="size-4" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          render={<Link href="/dashboard/publier" />}
          nativeButton={false}
          className="h-11 shrink-0 rounded-xl bg-[#ffa514] px-5 text-[14px] font-semibold text-slate-950 shadow-[0_8px_20px_rgba(255,165,20,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
        >
          + Publier une demande
        </Button>
      </div>
    </div>
  );
}

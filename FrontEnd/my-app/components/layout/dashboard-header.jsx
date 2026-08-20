"use client";

import Link from "next/link";
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
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";

export function DashboardHeader({
  title,
  subtitle,
  ctaLabel = "+ Publier une demande",
  ctaHref = "/dashboard/publier",
  settingsHref = "/dashboard/parametres",
  notificationCount = 3,
}) {
  const { data: user } = useUser();
  const logout = useLogout();

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
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 outline-none hover:bg-slate-50">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={displayName} />
              <AvatarFallback className="bg-teal-100 text-lg font-bold text-teal-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-[14px] font-semibold text-slate-800">
              {displayName}
            </span>
            <ChevronDown className="size-4 text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl border border-slate-200/80 p-1.5 shadow-[0_12px_30px_rgba(12,55,55,0.1)]"
          >
            <DropdownMenuItem
              render={<Link href={settingsHref} />}
              className="gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold whitespace-nowrap text-slate-700 focus:bg-slate-50 focus:text-slate-950"
            >
              <Settings className="size-4 text-slate-500" strokeWidth={1.8} />
              Paramètres du compte
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold"
              onClick={() => logout.mutate()}
            >
              <LogOut className="size-4" strokeWidth={1.8} />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {ctaLabel && (
          <Button
            render={<Link href={ctaHref} />}
            nativeButton={false}
            className="h-11 shrink-0 rounded-xl bg-[#0b1730] px-5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(11,23,48,0.2)] transition hover:-translate-y-0.5 hover:bg-[#142248]"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleHelp,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import logo from "@/app/assets/logo.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";

const navItems = [
  { href: "/dashboard", Icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/dashboard/demandes", Icon: FileText, label: "Demandes actives" },
  {
    href: "/dashboard/publier",
    Icon: Megaphone,
    label: "Publier une demande",
  },
  {
    href: "/dashboard/messagerie",
    Icon: MessageSquare,
    label: "Messagerie",
    badge: 2,
  },
  {
    href: "/dashboard/historique",
    Icon: History,
    label: "Historique des missions",
  },
  {
    href: "/dashboard/parametres",
    Icon: Settings,
    label: "Paramètres du compte",
  },
  { href: "/dashboard/aide", Icon: CircleHelp, label: "Aide et support" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: user } = useUser();
  const logout = useLogout();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-full shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-[#0b1730] p-4 transition-[width] duration-200 lg:flex ${
        collapsed ? "w-40" : "w-64"
      }`}
    >
      <div className={`flex ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Développer le menu" : "Réduire le menu"}
          className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-3.5" strokeWidth={1.8} />
          ) : (
            <PanelLeftClose className="size-3.5" strokeWidth={1.8} />
          )}
        </button>
      </div>
      <Image src={logo} alt="SOS House" className="w-24 mx-auto mt-2" />

      <nav className="mt-4 flex flex-col gap-0.5">
        {navItems.map(({ href, Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] font-semibold transition ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-teal-600 text-white shadow-[0_8px_20px_rgba(11,146,218,0.3)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
              {!collapsed && (
                <span className="flex-1 whitespace-nowrap">{label}</span>
              )}
              {badge && !collapsed && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#ffa514] text-[11px] font-bold text-slate-950">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className={`mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <Avatar size="lg">
          <AvatarImage
            src={user?.avatar || avatar1.src}
            alt={user?.name ?? "Profil"}
          />
          <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-white">
              {user?.name ?? "Mon profil"}
            </p>
            {user?.email && (
              <p className="truncate text-[12px] text-slate-400">
                {user.email}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        title={collapsed ? "Se déconnecter" : undefined}
        onClick={() => logout.mutate()}
        className={`mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-3 py-2 text-left text-[14px] font-semibold text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <LogOut className="size-[18px] shrink-0" strokeWidth={1.8} />
        {!collapsed && (
          <span className="whitespace-nowrap">Se déconnecter</span>
        )}
      </button>
    </aside>
  );
}

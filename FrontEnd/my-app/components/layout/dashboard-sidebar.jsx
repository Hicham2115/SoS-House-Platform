"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleHelp,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  Settings,
} from "lucide-react";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import logo from "@/app/assets/logo.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store/auth";

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
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white p-5 lg:flex">
      <Image src={logo} alt="SOS House" className="w-30 mx-auto" />

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map(({ href, Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition ${
                active
                  ? "bg-teal-600 text-white shadow-[0_8px_20px_rgba(13,148,136,0.25)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
              <span className="flex-1 whitespace-nowrap">{label}</span>
              {badge && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#ffa514] text-[11px] font-bold text-slate-950">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-16 flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
        <Avatar size="lg">
          <AvatarImage
            src={user?.avatarUrl || avatar1.src}
            alt={user?.name ?? "Profil"}
          />
          <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold text-slate-950">
            {user?.name ?? "Mon profil"}
          </p>
          {user?.email && (
            <p className="truncate text-[12px] text-slate-500">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold text-red-600 transition hover:bg-red-50"
      >
        <LogOut className="size-[18px] shrink-0" strokeWidth={1.8} />
        <span className="whitespace-nowrap">Se déconnecter</span>
      </button>
    </aside>
  );
}

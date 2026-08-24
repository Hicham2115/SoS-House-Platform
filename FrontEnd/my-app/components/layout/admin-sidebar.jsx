"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, ShieldCheck, Users } from "lucide-react";
import logo from "@/app/assets/logo.jpeg";
import { useLogout } from "@/hooks/use-logout";

const navItems = [
  { href: "/admin", Icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: "/admin/verification", Icon: ShieldCheck, label: "Vérification" },
  { href: "/admin/comptes", Icon: Users, label: "Gestion des comptes" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col bg-[#0b1730] p-4 lg:flex">
      <Image src={logo} alt="SOS House" className="mx-auto mt-2 w-24" />

      <nav className="mt-6 flex flex-1 flex-col gap-0.5">
        {navItems.map(({ href, Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-semibold transition ${
                active
                  ? "bg-teal-600 text-white shadow-[0_8px_20px_rgba(11,146,218,0.3)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => logout.mutate()}
        className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-3 py-2 text-left text-[14px] font-semibold text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="size-[18px] shrink-0" strokeWidth={1.8} />
        <span>Se déconnecter</span>
      </button>
    </aside>
  );
}

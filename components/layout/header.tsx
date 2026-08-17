import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Pour les prestataires", href: "/prestataires" },
  { label: "À propos", href: "/a-propos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.055] bg-white/95 shadow-[0_1px_0_rgba(7,57,58,0.02)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:gap-6 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={logo}
            alt="SOS House"
            className="h-11 w-auto lg:h-15"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-semibold text-slate-800 transition-colors hover:text-teal-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-7 lg:flex">
          <Link
            href="/connexion"
            className="text-[14px] font-semibold text-teal-700 transition-colors hover:text-teal-800"
          >
            Se connecter
          </Link>
          <Button
            render={<Link href="/publier-une-demande" />}
            nativeButton={false}
            className="h-12 rounded-xl bg-[#ffc400] px-7 text-[14px] font-semibold text-slate-950 shadow-[0_8px_20px_rgba(255,196,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19]"
          >
            Publier une demande
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Button
            render={<Link href="/publier-une-demande" />}
            nativeButton={false}
            className="h-10 rounded-md bg-[#ffc400] px-4 text-sm font-bold text-slate-950"
          >
            Demander
          </Button>
          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

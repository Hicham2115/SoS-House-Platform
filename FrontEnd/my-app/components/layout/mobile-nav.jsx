"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
export function MobileNav({ navLinks, onOpenAuth, onOpenSignUp }) {
    return (<Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Ouvrir le menu"/>}>
        <Menu className="size-5"/>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (<SheetClose key={link.href} render={<Link href={link.href}/>} nativeButton={false} className="rounded-lg px-3 py-2.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-teal-50 hover:text-teal-700">
              {link.label}
            </SheetClose>))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
          <SheetClose onClick={onOpenAuth} className="cursor-pointer rounded-lg px-3 py-2.5 text-center text-[15px] font-semibold text-teal-700">
            Se connecter
          </SheetClose>
          <SheetClose onClick={onOpenSignUp} render={<Button className="h-12 rounded-xl bg-[#ffc400] px-7 text-[15px] font-semibold text-slate-950 shadow-[0_8px_20px_rgba(255,196,0,0.18)] transition hover:bg-[#ffcb19]"/>} nativeButton={false}>
            Publier une demande
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>);
}

import Link from "next/link";
import { ArrowRight, House, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
export default function NotFound() {
    return (<section className="relative flex flex-1 items-center overflow-hidden bg-[#f4f3fb] px-4 py-20 sm:px-8">
      <ZelligeCorner id="not-found-zellige-tr" corner="top-right" className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-70 sm:h-110 sm:w-110"/>
      <ZelligeCorner id="not-found-zellige-bl" corner="bottom-left" className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 opacity-70 sm:h-110 sm:w-110"/>

      <div className="relative mx-auto flex max-w-[560px] flex-col items-center px-4 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <SearchX className="size-9"/>
        </span>
        <p className="mt-6 text-[80px] font-bold leading-none text-teal-600 sm:text-[100px]">
          404
        </p>
        <h1 className="mt-4 text-[26px] font-bold text-slate-950 sm:text-[32px]">
          Cette page est introuvable
        </h1>
        <p className="mt-4 text-[16px] leading-[1.7] text-slate-600">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour trouver un artisan vérifié
          partout au Maroc.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button render={<Link href="/"/>} nativeButton={false} className="h-[56px] justify-between rounded-xl bg-[#ffa514] px-6 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d] sm:min-w-[220px]">
            <House className="size-5"/>
            Retour à l&apos;accueil
          </Button>
          <Button render={<Link href="/services"/>} nativeButton={false} variant="outline" className="h-[56px] rounded-xl border-teal-700 px-7 text-[15px] font-bold text-teal-700 transition hover:bg-teal-50">
            Voir les services <ArrowRight className="size-5"/>
          </Button>
        </div>
      </div>
    </section>);
}

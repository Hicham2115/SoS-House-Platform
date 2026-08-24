"use client";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Headset,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import bghero from "@/app/assets/worker2.png";
import { Button } from "@/components/ui/button";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
const trustItems = [
  {
    icon: ShieldCheck,
    label: "Artisans vérifiés en personne",
  },
  {
    icon: Star,
    label: "Avis liés aux vrais travaux",
  },
  {
    icon: FileText,
    label: "Facture garantie (avec ou sans TVA)",
  },
  {
    icon: Lock,
    label: "Vos données sont sécurisées",
  },
];
export function CallToAction() {
  const openSignUp = useAuthDialogStore((state) => state.openSignUp);
  return (
    <section className="relative overflow-hidden bg-[#f4f3fb] px-4 py-10 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-[54%_46%]">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="inline-flex w-fit items-center gap-2 text-sm font-bold tracking-[0.06em] text-teal-800">
              <MapPin className="size-4" />
              PARTOUT À CASABLANCA, ON EST LÀ POUR VOUS
            </div>
            <h2 className="mt-6 text-[34px] font-bold leading-[1.15] text-slate-950 sm:text-[42px] lg:text-[46px]">
              Besoin d&apos;un artisan en toute{" "}
              <span className="text-teal-600">confiance</span> ?
            </h2>
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.7] text-slate-600">
              Publiez votre demande gratuitement. Recevez des réponses
              d&apos;artisans vérifiés et choisissez sereinement celui qui vous
              convient.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => openSignUp("client")}
                className="h-[56px] justify-between rounded-xl bg-[#ffa514] px-6 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d] sm:min-w-[220px]"
              >
                Publier une demande <ArrowRight className="size-5" />
              </Button>
              <Button
                onClick={() => openSignUp("artisan")}
                variant="outline"
                className="h-[56px] rounded-xl border-teal-800 px-7 text-[15px] font-bold text-teal-800 transition hover:bg-teal-50"
              >
                Devenir prestataire
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800">
                    <item.icon className="size-4.5" />
                  </span>
                  <p className="text-sm leading-snug text-slate-700">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <Image
              src={bghero}
              alt=""
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 right-6 flex max-w-[280px] items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <ShieldCheck className="size-5" />
              </span>
              <p className="text-sm text-slate-800">
                <span className="font-bold text-slate-950">
                  La confiance d&apos;abord.
                </span>
                <br />
                Des travaux bien faits, des relations qui durent.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-slate-100 bg-[#f4f3fb] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-3">
            <Headset className="size-6 shrink-0 text-teal-800" />
            <div>
              <p className="font-bold text-slate-950">Besoin d&apos;aide ?</p>
              <p className="text-sm text-slate-600">
                Notre équipe est disponible 7j/7 pour vous
                accompagner, partout à Casablanca.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2.5">
              <Phone className="size-5 shrink-0 text-teal-800" />
              <div>
                <p className="font-bold text-slate-950">06 22 123 456</p>
                <p className="text-xs text-slate-500">Appel national</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="size-5 shrink-0 text-teal-800" />
              <div>
                <p className="font-bold text-slate-950">Chat en direct</p>
                <p className="text-xs text-slate-500">Réponse rapide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
